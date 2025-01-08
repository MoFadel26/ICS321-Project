//for production use vercel sql
//import { sql } from "@vercel/postgres";
require("dotenv").config();
import sql from "./sql";
import { stat } from "fs";
import { error } from "console";

export async function fetchUser(email, password) {
  try {
    var data = await sql.query(`
    SELECT email, passenger_id
    FROM passenger
    WHERE passenger.email = '${email}' AND passenger.password = '${password}';`);
    if (data.rows[0] == null) {
      data = await sql.query(`
    SELECT email, admin_id
    FROM admin
    WHERE admin.email = '${email}' AND admin.password = '${password}';`);
      if (data.rows[0]) {
        data.rows[0].isAdmin = true;
      }
    } else {
      data.rows[0].isAdmin = false;
    }
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

// export async function printuser(user) {
//   console.log(user);
// }

export async function fetchStaff() {
  try {
    const data = await sql.query(`
        select s.staff_id, s.name, s.role, sa.train_id
        from staff s 
            left join staff_assign sa on s.staff_id = sa.staff_id
        `);
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function insertStaff(staff_id, train_id) {
  const date = new Date().toISOString().split("T")[0];
  try {
    await sql.query(
      `insert into staff_assign (staff_id, train_id, date) 
                         VALUES ($1, $2, $3);`,
      [staff_id, train_id, date]
    );
    return true;
  } catch (error) {
    console.log(`Database Error: ${error}`);
    return error.message;
  }
}

export async function fetchReservation(id) {
  try {
    const data = await sql.query(
      `SELECT * FROM bookings WHERE bookings.reservation_number = '${id}'`
    );
    return data.rows[0];
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function fetchAllReservation() {
  try {
    const data = await sql.query(
      `SELECT b.user_id, b.reservation_number, t.trip_id, b.booking_date, t.from_station, t.to_station, tr.capacity, COALESCE(c.passengerCount, 0) AS passenger_count
         FROM bookings b 
                JOIN trips t ON b.trip_id = t.trip_id
                JOIN trains tr ON t.train_id = tr.train_id
                LEFT JOIN ( SELECT b.trip_id, COUNT(b.trip_id) AS passengerCount
                            FROM bookings b
                            GROUP BY b.trip_id) c ON t.trip_id = c.trip_id;`
    );
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function addTripDb(formData) {
  try {
    const query = `
            INSERT INTO trips (trip_id, date, train_id, from_station, to_station)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING trip_id;
        `;
    const data = await sql.query(query, [
      formData.get("trip_id"),
      formData.get("date"),
      formData.get("train_id"),
      formData.get("from_station"),
      formData.get("to_station"),
    ]);
    return true;
  } catch (error) {
    console.log(`Database Error: ${error}`);
    return error.message;
  }
}

export async function deleteTripDb(trip_id) {
  try {
    // Delete in correct order: payments -> bookings -> trip
    await sql.query(
      `DELETE FROM payment
             WHERE reservation_number IN (
                 SELECT reservation_number
                 FROM bookings
                 WHERE trip_id = $1
             )`,
      [trip_id]
    );

    await sql.query("DELETE FROM bookings WHERE trip_id = $1", [trip_id]);

    await sql.query("DELETE FROM waiting_list WHERE trip_id = $1", [trip_id]);

    await sql.query("DELETE FROM trips WHERE trip_id = $1", [trip_id]);
    return true;
  } catch (error) {
    console.log(`Database Error: ${error}`);
    return error.message;
  }
}

export async function updateTrip(formData) {
  formData.train_id = undefined;
  try {
    const query = `
            UPDATE trips
            SET train_id = $1,
                date = $2,
                from_station = $3,
                to_station = $4
            WHERE trip_id = $5;
        `;
    await sql.query(query, [
      formData.get("train_id"),
      formData.get("date"),
      formData.get("from_station"),
      formData.get("to_station"),
      formData.get("trip_id"),
    ]);
    return true;
  } catch (error) {
    console.log(`Database Error: ${error}`);
    return error.message;
  }
}

export async function fetchTrips() {
  const date = Date.now();
  try {
    const data = await sql.query(
      `SELECT t.trip_id as id, tr.train_id, t.date, tr.train_name_en, s1.station_name as from_station, s2.station_name as to_station, tr.capacity as capacity, b.passengerCount
       FROM trips t
       JOIN trains tr ON t.train_id = tr.train_id
       JOIN stations s1 ON t.from_station = s1.station_name
       JOIN stations s2 ON t.to_station = s2.station_name
       LEFT JOIN (SELECT t.trip_id, COUNT(t.trip_id) as passengerCount
        FROM trips t
        JOIN bookings b ON t.trip_id = b.trip_id
        GROUP BY t.trip_id) b ON b.trip_id = t.trip_id
       WHERE t.date > to_timestamp(${date} / 1000.0)`
    );
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function promotePassenger(
  passenger_id,
  trip_id,
  date,
  seating_class
) {
  try {
    // Delete from waiting_list
    await sql.query(
      `DELETE FROM waiting_list WHERE passenger_id = '${passenger_id}'`
    );

    // Insert into bookings
    await sql.query(
      `INSERT INTO bookings (booking_date, seating_class, user_id, trip_id) VALUES ($1, $2, $3, $4)`,
      [date, seating_class, passenger_id, trip_id]
    );

    return true;
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    return false;
  }
}

export async function fetchPassenger(passenger_id) {
  try {
    const data = await sql.query(`
      SELECT *
        FROM passenger
        WHERE passenger_id = '${passenger_id}'`);
    return data.rows[0];
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function fetchWaitinglist() {
  try {
    const data = await sql.query(`
        SELECT
            wl.waiting_id,
            p.passenger_id,
            wl.waiting_status,
            p.miles,
            wl.trip_id
        FROM
            waiting_list wl
                JOIN
            passenger p
            ON
                wl.passenger_id = p.passenger_id
        `);
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function fetchDependent(passenger_id) {
  try {
    const data = await sql.query(`
      SELECT *
        FROM dependents d
        JOIN (
          SELECT *
            FROM passenger
            WHERE passenger_id = '${passenger_id}') p 
          ON p.passenger_id = d.passenger_id`);
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function insertDependent(dependentInfo) {
  try {
    await sql.query(`INSERT INTO users(
	national_id, name)
	VALUES (${dependentInfo.national_id}, 'a');`);
    await sql.query(`INSERT INTO dependents(
	dependent_id, name, sex, relationship, passenger_id)
	VALUES (${dependentInfo.national_id}, '${dependentInfo.name}', '${dependentInfo.sex}', '${dependentInfo.relationship}', '${dependentInfo.passenger_id}');`);
    return true;
  } catch (error) {
    console.log(`Database Error: ${error}`);
    return error.message;
  }
}

export async function fetchTripIDs(oldTripID) {
  try {
    const data = await sql.query(
      `SELECT trip_id FROM trips WHERE trip_id != $1`,
      [oldTripID]
    );
    return data.rows;
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    return null; // Return null to indicate an error occurred
  }
}

export async function bookTrip(user_id, seatingClass, trip) {
  try {
    const data = await sql.query(
      `INSERT INTO bookings(
	      seating_class, user_id, trip_id)
	      VALUES ('${seatingClass}', '${user_id}', '${trip}')
        RETURNING reservation_number;`
    );
    return data.rows[0].reservation_number;
  } catch (error) {
    console.log(`Database Error: ${error}`);
    return error.message;
  }
}

export async function addPayment(reservation_number, status, amount) {
  try {
    const data = await sql.query(
      `INSERT INTO payment(
        amount, status, reservation_number)
	      VALUES ('${amount}', '${status}',  '${reservation_number}');`
    );
    return true;
  } catch (error) {
    console.log(`Database Error: ${error}`);
    return error.message;
  }
}
export async function fetchTrain(train_id) {
  try {
    const data = await sql.query(`
        SELECT * FROM trains WHERE train_id = '${train_id}'`);
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function fetchTrains() {
  try {
    const data = await sql.query(`
        select t.trip_id, t.train_id,tr.train_name_en, t.from_station, t.to_station, t.date
        from trips t
            join trains tr on t.train_id = tr.train_id`);
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function fetchAllTrainIds() {
  try {
    const data = await sql.query(`
        SELECT train_id FROM trains`);
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function fetchBookingGridInformation(userID) {
  try {
    const data = await sql.query(`
        SELECT *
         FROM Bookings b
         JOIN payment p ON p.reservation_number = b.reservation_number
         JOIN trips t ON t.trip_id = b.trip_id
         WHERE b.user_id = '${userID}' `);
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function completePayment(payment_id) {
  try {
    const data = await sql.query(`
      UPDATE payment
	      SET status='paid'
	      WHERE payment_id = '${payment_id}'
      `);
    return data.rows;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

export async function deleteDependent(dependentID) {
  try {
    await sql.query(`
      DELETE FROM dependents
	      WHERE dependent_id = '${dependentID}';
      `);
    await sql.query(`
        DELETE FROM users
          WHERE national_id = '${dependentID}';
        `);
    return true;
  } catch (error) {
    console.log(`Database Error: ${error}`);
  }
}

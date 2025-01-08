import * as React from "react";
import {
  fetchPassenger,
  fetchDependent,
  fetchBookingGridInformation,
} from "../db";
import { getSession } from "../lib/session";
import DependentGrid from "../UI/passenger/dependentGrid";
import BookingDatagrid from "../UI/passenger/bookingGrid";
import PassengerInfo from "../UI/passenger/passengerInfo";

export default async function Page() {
  const session = await getSession();
  const user = await fetchPassenger(session.passenger_id);
  const dependents = await fetchDependent(session.passenger_id);
  const bookings = await fetchBookingGridInformation(session.passenger_id);

  return (
    <div className="container mx-auto">
      {/* Welcome Section */}
      <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
        <h1 className="text-5xl font-bold">
          Welcome,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500  to-cyan-700">
            {user.fname} {user.lname}
          </span>
        </h1>
        <p>Your gate to manage your booking, family, and more!</p>
      </div>
      <PassengerInfo user={user} />
      <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
        <h2 className="text-xl font-bold">Manage your family</h2>
        <p>Check or add dependents with ease</p>
        <DependentGrid rows={dependents} />
      </div>
      <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
        <h2 className="text-xl font-bold">Manage your bookings</h2>
        <p>Manage your bookings and settle your tickets.</p>
        <BookingDatagrid rows={bookings} />
      </div>
    </div>
  );
}

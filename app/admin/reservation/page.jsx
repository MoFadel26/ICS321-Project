import {fetchAllReservation, fetchReservation, fetchTrips, fetchWaitinglist} from "../../db";
import * as React from "react";
import DataGrid from "../../UI/Booking/TripsDatagrid";
import AdminTrips from "../../UI/Booking/adminTrips"

export default async function Page() {
  const rows = await fetchTrips();
    // const rows = await fetchAllReservation();
  return (
      <div className="container mx-auto">
        <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4 text-3xl font-bold underline">
          Trips Page
        </div>
          <AdminTrips rows={rows} />
      </div>
  );
}

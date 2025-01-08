import * as React from "react";
import { fetchTrips } from "../db";
import DataGrid from "../UI/Booking/TripsDatagrid";

export default async function Page() {
  const rows = await fetchTrips();
  return (
    <div className="container mx-auto">
      <DataGrid rows={rows} />
    </div>
  );
}

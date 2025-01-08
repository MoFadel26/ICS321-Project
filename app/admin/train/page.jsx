// export default function Home() {
//   return <h1 className="text-3xl font-bold underline">Trains Page</h1>;
// }


import {fetchAllReservation, fetchStaff, fetchTrain, fetchTrains} from "../../db";
import StaffGrid from "../../UI/staff/staffGrid";
import DataGrid from "../../UI/Booking/TripsDatagrid";
import ReservationGrid from "../../UI/Booking/reservationsGrid";
import TrainGrid from "../../UI/trains/trainsGrid";
import * as React from "react";


export default async function Page() {
    const trainRows = await fetchTrains();
  const rows = await fetchStaff();
  return (
      <div>
        <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4 text-3xl font-bold underline">
          Trains Page
        </div>
        <div className="container mx-auto">
          <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4 text-2xl font-bold">
            Trains
          </div>
            <TrainGrid rows={trainRows}/>

          <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4 text-2xl font-bold">
            Staff
          </div>
          <StaffGrid rows={rows}/>
        </div>
      </div>
  );
}

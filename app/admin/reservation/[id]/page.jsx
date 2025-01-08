import * as React from "react";
import WaitlistForm from "../../../UI/waitlist/waitlistForm";
import {fetchTripIDs} from "../../../db.js";

export default async function Page({params}) {
    const parameters = (await params).id;
    const decodedParams = decodeURIComponent(parameters);
    const parts = decodedParams.split("=");
    const passengerId = parts[0];
    const oldTripId = parts[1];
    const tripId = await fetchTripIDs(oldTripId);
    return (
        <div className="container mx-auto">
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
                <h1 className="text-5xl font-bold text-center">
                    Promote passenger with ID: {
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500  to-cyan-700">
                       {passengerId}
          </span> } to another trip.
                </h1>
            </div>
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
               <WaitlistForm passengerId={passengerId} tripId={tripId}/>
            </div>
        </div>
    );
}

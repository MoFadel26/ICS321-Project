import * as React from "react";
import { getSession } from "../../../lib/session";
import { fetchPassenger } from "../../../db.js";
import DependentForm from "../../../UI/passenger/dependentForm";

export default async function Page() {
    const session = await getSession();
    const user = await fetchPassenger(session.passenger_id);
    return (
        <div className="container mx-auto">
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
                <h1 className="text-5xl font-bold">
                    Welcome,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500  to-cyan-700">
            {user.fname} {user.lname}
          </span>
                </h1>
                <p>Add your family using our web application!</p>
            </div>
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
                <DependentForm passenger_id={user.passenger_id} />
            </div>
        </div>
    );
}

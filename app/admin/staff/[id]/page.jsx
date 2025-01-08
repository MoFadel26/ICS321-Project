import * as React from "react";
import { fetchAllTrainIds } from "../../../db.js";
import StaffPopup from "../../../UI/staff/staffPopup";

export default async function page({ params }) {
    const parameters = (await params).id; // "6%3DYusuf"
    const decodedId = decodeURIComponent(parameters); // "6=Yusuf"
    const parts = decodedId.split('='); // ["6", "Yusuf"]
    const id = parts[0]; // "6"
    const name = parts[1]; // "Yusuf"

    const data = await fetchAllTrainIds();
    // console.log(data);

    return (
        <div className="container mx-auto">
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
                <h1 className="text-5xl font-bold">
                    Assign {name} with ID {id}, to a train.
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500  to-cyan-700">
                    </span>
                </h1>
            </div>
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
                <StaffPopup data={data} id={id}/>
            </div>

        </div>
    );
}
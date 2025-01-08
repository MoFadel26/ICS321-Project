import * as React from "react";
import {fetchWaitinglist} from "../../db";
import WaitlistGrid from "../../UI/waitlist/waitlistGrid";

export default async function Page() {
    const rows = await fetchWaitinglist();
    return (
        <div className="container mx-auto">
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4 text-3xl font-bold underline">
                Admin Passenger Page
            </div>
            <p>Promote waitlisted passengers</p>
            <WaitlistGrid rows={rows} />
        </div>
    );
}

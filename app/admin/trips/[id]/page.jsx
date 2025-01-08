
import TripsForm from "../../../UI/trips/tripsForm";

export default async function Page({ params }) {
    const parameters = (await params).id;
    const decodedId = decodeURIComponent(parameters);
    const parts = decodedId.split('=');
    const dateObj = new Date(parts[5]);
    const tripDetails = {
        tripId: parts[0],
        trainName: parts[1],
        trainId: parts[2],
        fromStation: parts[3],
        toStation: parts[4],
        date: dateObj.toISOString().split("T")[0]
    };


    return (
        <div className="container mx-auto">
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
                <h1 className="text-5xl font-bold">
                    Welcome,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500  to-cyan-700">
          </span>
                </h1>
                <p>
                    We're thrilled you've chosen to book your trip through our website!
                </p>
            </div>
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
                <TripsForm tripDetails={tripDetails}/>
            </div>
        </div>
    );
}

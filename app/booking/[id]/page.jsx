import { getSession } from "../../lib/session";
import BookingForm from "../../UI/Booking/BookingForm";
import { fetchPassenger} from "../../db";

export default async function Page({ params }) {
  const tripId = (await params).id;
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
        <p>
          We're thrilled you've chosen to book your trip through our website!
        </p>
      </div>
      <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
        <BookingForm trip_id={tripId} passenger={user} />
      </div>
    </div>
  );
}

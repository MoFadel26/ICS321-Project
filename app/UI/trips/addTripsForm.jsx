"use client";
import { useActionState } from "react";
import { addTrip } from "../../actions/trips";

export default function TripForm({ tripDetails }) {
    const [state, action, pending] = useActionState(addTrip, undefined);
    return (
        <>
            <form className="w-full" action={action}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="trip_id">
                            Trip ID
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="trip_id"
                            name="trip_id"
                            type="number"
                        />
                        {state?.errors?.trip_id && <p className="text-red-500 text-xs italic">{state.errors.trip_id}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            name="date"
                            id="date"
                            type="date"
                        />
                        {state?.errors?.date && <p className="text-red-500 text-xs italic">{state.errors.date}</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="train_id">
                            Train ID
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="train_id"
                            name="train_id"
                            type="text"
                        />
                        {state?.errors?.train_id && <p className="text-red-500 text-xs italic">{state.errors.train_id}</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="from_station">
                            From Station
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="from_station"
                            name="from_station"
                            type="text"
                        />
                        {state?.errors?.from_station && <p className="text-red-500 text-xs italic">{state.errors.from_station}</p>}
                    </div>
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="to_station">
                            To Station
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="to_station"
                            name="to_station"
                            type="text"
                        />
                        {state?.errors?.to_station && <p className="text-red-500 text-xs italic">{state.errors.to_station}</p>}
                    </div>
                </div>

                {state?.errors?.database && <p className="text-red-500 text-xs italic">{state.errors.database}</p>}

                <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" disabled={pending}>
                    Add Trip
                </button>
            </form>
        </>
    );
}
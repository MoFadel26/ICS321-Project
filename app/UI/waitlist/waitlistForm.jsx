"use client";
import { useActionState } from "react";
import { promotePass } from "../../actions/promotePassengers";

export default function WaitlistForm({ passengerId, tripId }) {
    const [state, action, pending] = useActionState(promotePass, undefined);

    if (!Array.isArray(tripId)) {
        return (
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-center">No trips available</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
            <form action={action} className="space-y-6">
                <div className="space-y-2">
                    <label
                        htmlFor="train-select"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Select Trip
                    </label>
                    <select
                        id="train-select"
                        name="train_id"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        <option value="">Choose a trip</option>
                        {tripId.map(item => (
                            <option key={item.trip_id} value={item.trip_id}>
                                Trip {item.trip_id}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="seating-select"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Select Seating Class
                    </label>
                    <select
                        id="seating-select"
                        name="seating_class"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        {[
                            {value: "", name: "none", label: "Choose a seating class"},
                            {value: "economy", name: "economy", label: "Economy Class"},
                            {value: "business", name: "business", label: "Business Class"},
                        ].map(option => (
                            <option key={option.value} value={option.value} name={option.name}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Travel Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                    {state?.errors?.date && (
                        <p className="text-sm text-red-500">{state.errors.date}</p>
                    )}
                </div>


                <input
                    type="hidden"
                    name="passenger_id"
                    value={passengerId}
                />

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-cyan-500 text-white font-medium py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {pending ? "Assigning..." : "Assign Trip"}
                </button>
            </form>
        </div>
    );
}
"use client";
import { useActionState } from "react";
import { addStaff } from "../../actions/staff";

export default function staffPopup({ data, id }) {
    const [state, action, pending] = useActionState(addStaff, undefined);

    console.log("This is the id " + id);

    if (!Array.isArray(data)) {
        return (
            <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
                <p>No trains available</p>
            </div>
        );
    }

    const trainOptions = data.map(item => (
        <option key={item.train_id} value={item.train_id}>
            Train {item.train_id}
        </option>
    ));

    return (
        <div className="max-w-screen-xl flex flex-col items-start mt-5 mx-auto p-4">
            <form action={action}>
                <label htmlFor="train-select" className="block text-sm font-medium text-gray-700">
                    Select a Train
                </label>
                <select
                    id="train-select"
                    name="train_id"
                    className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full"
                >
                    <option value="">-- Please choose a train --</option>
                    {trainOptions}
                </select>

                <input
                    type="hidden"
                    name="staff_id"
                    value={id}
                />

                <button type="submit" className="mt-4 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded"
                        disabled={pending}
                >
                    Assign
                </button>
            </form>
        </div>
    );
}
"use client";
import { useActionState } from "react";
import { addDependent } from "../../actions/dependents";

export default function DependentForm({ passenger_id }) {
  const [state, action, pending] = useActionState(addDependent, undefined);
  return (
    <form className="w-full" action={action}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="national_id"
          >
            National ID
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="national_id"
            name="national_id"
            type="text"
            placeholder="1132643263"
          />
          {state?.errors?.national_id && (
            <p className="text-red-500 text-xs italic">
              {state.errors.national_id}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="name"
            name="name"
            type="text"
            placeholder="Omar"
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-xs italic">{state.errors.name}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="sex"
          >
            Gender
          </label>
          <div className="relative">
            <select
              name="sex"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="sex"
            >
              <option>M</option>
              <option>F</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="relationship"
          >
            Relationship
          </label>
          <div className="relative">
            <select
              name="relationship"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="relationship"
            >
              <option>Children</option>
              <option>Sibling</option>
              <option>Parent</option>
              <option>Spouse</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <input type="hidden" value={passenger_id} name="passenger_id"></input>
      {state?.errors?.database && (
        <p className="text-red-500 text-xs italic">{state.errors.database}</p>
      )}
      <div className="flex flex-wrap -mx-3 mb-2"></div>

      <button
        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
        disabled={pending}
      >
        Add
      </button>
    </form>
  );
}

"use client";
import { useActionState, useState } from "react";
import { addBooking } from "../../actions/booking";
import PriceCompenent from "../Payment/priceCompenent";

const prices = {
  Economy: 100,
  Business: 300,
};

export default function bookingForm({ trip_id, passenger }) {
  const [state, action, pending] = useActionState(addBooking, undefined);
  const [seatingClass, setSeatingClass] = useState("Economy");
  const [dependents, setDependents] = useState("");
  function calucatePrices() {
    const pricePerSeat = prices[seatingClass];
    const dependentNumbers = numberOfValidDependent();
    const loyaltyDiscount = getLoyaltyDiscount(passenger.miles);
    var pricesList = [
      pricePerSeat * (dependentNumbers + 1),
      pricePerSeat * dependentNumbers * 0.25,
    ];
    pricesList[2] = loyaltyDiscount * (pricesList[0] - pricesList[1]);
    pricesList[3] = (pricesList[0] - pricesList[1] - pricesList[2]) * 0.15;
    return pricesList;
  }
  var tripPrice = calucatePrices();
  var totalPrice = tripPrice[0] - tripPrice[1] - tripPrice[2] + tripPrice[3];

  function numberOfValidDependent() {
    const dependentInput = dependents;
    const dependentArray = dependentInput.split(",");
    var numberOfDependent = 0;
    dependentArray.forEach((dependent) => {
      dependent = dependent.trim();
      if (dependent.length == 10) {
        numberOfDependent += 1;
      }
    });
    return numberOfDependent;
  }

  function getLoyaltyDiscount(miles) {
    if (miles >= 100000) {
      return 0.25;
    } else if (miles >= 50000) {
      return 0.1;
    } else if (miles >= 10000) {
      return 0.05;
    } else {
      return 0.0;
    }
  }
  return (
    <form className="w-full" action={action}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="seating_Class"
          >
            Seating Class
          </label>
          <div className="relative">
            <select
              name="seatingClass"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="seatingClass"
              onChange={(e) => {
                setSeatingClass(e.target.value);
              }}
            >
              <option>Economy</option>
              <option>Business</option>
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
        <div className="w-full mt-4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="dependentsID"
          >
            Dependents ID
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="dependentsID"
            name="dependentsID"
            type="text"
            placeholder="1264253456, 1119253265"
            onChange={(e) => {
              setDependents(e.target.value);
            }}
          />
          <input type="hidden" name="user_id" value={passenger.passenger_id} />
          <input type="hidden" name="trip_id" value={trip_id} />
          <input type="hidden" name="amount" value={totalPrice} />
          <p className="text-black text-xs italic">
            Add children national IDs seperated by a comma(,) to book a ticket
            for them with you.
          </p>
        </div>
      </div>

      {state?.errors?.database && (
        <p className="text-red-500 text-xs italic">{state.errors.database}</p>
      )}
      <div className="flex flex-wrap -mx-3 mb-2"></div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <PriceCompenent prices={calucatePrices()} />
      <button
        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
        disabled={pending}
        name="pay"
      >
        Pay
      </button>
      <button
        className="bg-gray-400 hover:bg-gray-600 text-white font-bold ml-5 py-2 px-4 rounded"
        disabled={pending}
        name="payLater"
      >
        Pay Later
      </button>
    </form>
  );
}

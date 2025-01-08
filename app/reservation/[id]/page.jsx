import * as React from "react";
import { fetchReservation } from "../../db";

export default async function Page({ params }) {
  const id = (await params).id;
  const data = await fetchReservation(id);

  return (
    <>
      <div className="h-screen flex -my-[5vh] items-center justify-center">
        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg p-3">
          <div className="px-10 py-10 sm:px-6">
            <h3 className="text-lg font-bold leading-6 text-gray-900">
              Reservation Informations
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details and informations about the reservation with id {id}.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl className="border-t border-gray-200">
              {data != undefined &&
                Object.entries(data).map(([key, value]) => {
                  if (key == "booking_date") {
                    return (
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt
                          key={key}
                          className="text-sm font-medium text-gray-500"
                        >
                          {key}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {value.toLocaleString()}
                        </dd>
                      </div>
                    );
                  }
                  return (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {key}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {value}
                      </dd>
                    </div>
                  );
                })}
              {data == undefined && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    No information has been found for this reservation ID
                  </dt>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { getUserClass } from "../../actions/util";

export default function PassengerInfo({ user }) {
  return (
    <div className="max-w-screen-xl flex flex-col items-stretch  mx-auto p-4">
      <div className="bg-white  shadow overflow-hidden sm:rounded-lg p-3">
        {/* Header */}
        <div className="p-3 sm:px-6">
          <h3 className="text-lg font-bold leading-6 text-gray-900">
            Your information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Check your informations on our system.
          </p>
        </div>
        {/* Table */}
        <div className="border-t border-gray-200 ">
          <dl className="border-t bg-gray-50 border-gray-200 ">
            <div className=" grid-cols-2 grid justify-between ">
              <div className=" px-4 pt-5 flex flex-row sm:gap-4 sm:px-6  max-w-1/2">
                <dt className="text-sm font-medium text-gray-500 grid">ID:</dt>
                <dd className="text-sm text-gray-900 sm:mt-0">
                  {user.passenger_id}
                </dd>
              </div>
              <div className=" px-4 pt-5 flex-row flex sm:gap-4 sm:px-6 max-w-1/2 ">
                <dt className="text-sm font-medium text-gray-500">
                  Full Name:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">
                  {user.fname} {user.lname}
                </dd>
              </div>
              <div className=" px-4 pt-5 flex-row flex sm:gap-4 sm:px-6 max-w-1/2 ">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">
                  {user.phone_number}
                </dd>
              </div>
              <div className=" px-4 pt-5 flex-row flex sm:gap-4 sm:px-6 max-w-1/2 ">
                <dt className="text-sm font-medium text-gray-500">Email:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">
                  {user.email}
                </dd>
              </div>
              <div className=" px-4 pt-5 flex-row flex sm:gap-4 sm:px-6 max-w-1/2 ">
                <dt className="text-sm font-medium text-gray-500">
                  Loyalty Miles:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">
                  {getUserClass(user.miles)}
                </dd>
              </div>
            </div>
            <div className=" px-4 pb-5 flex-row flex sm:gap-4 sm:px-6 max-w-1/2 "></div>
          </dl>
        </div>
        <div className="flex flex-col  border-t border-gray-200 "></div>
      </div>
    </div>
  );
}

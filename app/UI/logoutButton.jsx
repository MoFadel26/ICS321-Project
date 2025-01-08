"use client";
import { useActionState } from "react";
import * as React from "react";
import { logout } from "../actions/auth";

export function LogoutButton() {
  const [state, action] = useActionState(logout, undefined);
  return (
    <form action={action} className="flex-col flex gap-1 items-center">
      <li>
        <button
          type="submit"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Logout
        </button>
      </li>
    </form>
  );
}

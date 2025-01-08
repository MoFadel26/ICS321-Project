"use client";
import { useActionState } from "react";
import { login } from "../actions/auth";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  console.log(state);
  return (
    <form action={action} className="flex-col flex gap-1 items-center">
      <div>
        <TextField
          required
          id="email"
          name="email"
          type="email"
          label="Email"
        />
      </div>
      <div className="mt-3">
        <TextField
          required
          type="password"
          name="password"
          id="password"
          label="Password"
        />
      </div>
      {state?.errors?.auth && (
        <div>
          <ul className="bg-red-100 border border-red-400 px-10 py-3 mt-3 relative rounded">
            <span className="   text-red-700">{state.errors.auth}</span>
          </ul>
        </div>
      )}
      <SubmitButton isPending={pending} />
    </form>
  );
}

function SubmitButton({ isPending }) {
  return (
    <Button
      className="bg-cyan-400 mt-3"
      variant="contained"
      disabled={isPending}
      type="submit"
    >
      Login
    </Button>
  );
}

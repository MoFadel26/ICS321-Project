"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { redirect } from "next/navigation";
export default function BookButton() {
  return (
    <Button
      onClick={() => {
        redirect("/booking");
      }}
      variant="contained"
      className="w-1/2 bg-cyan-500 text-black font-semibold"
    >
      Book a ticket
    </Button>
  );
}

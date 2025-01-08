"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { redirect } from "next/navigation";

export default function ReservationDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleForm = (formData) => {
    console.log(formData);
  };
  return (
    <div className="w-1/2 font-sans">
      <Button
        variant="outlined"
        className=" w-full font-inter text-black border-cyan-500 font-medium"
        onClick={handleClickOpen}
      >
        Check reservation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const reservation = formJson.reservation;
            redirect(`/reservation/${reservation}`);
            handleClose();
          },
        }}
      >
        <DialogTitle>Check reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your reservation ID
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="reservation"
            name="reservation"
            label="Reservation ID"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Check</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

"use server";
import { dependentFormSchema } from "../lib/definitions";
import { bookTrip, addPayment, completePayment } from "../db";
import { redirect } from "next/navigation";
import exp from "constants";

export async function addBooking(state, formData) {
  const seatingClass = formData.get("seatingClass");
  var dependents = formData.get("dependentsID");
  const trip_id = formData.get("trip_id");
  const passengerId = formData.get("user_id");
  const amount = formData.get("amount");
  console.log(amount);
  const bookingId = await bookTrip(passengerId, seatingClass, trip_id);
  if (isNaN(bookingId)) {
    return { errors: { database: bookingId } };
  }
  if (formData.has("pay")) {
    //user paid
    const paymentSuccess = await addPayment(bookingId, "paid", amount);
    if (paymentSuccess != true) {
      return { errors: { database: paymentSuccess } };
    }
  } else {
    await addPayment(bookingId, "pending", amount);
  }
  dependents = dependents.split(",");
  for (const dependent of dependents) {
    if (validateUserID(dependent)) {
      var returnedID = await bookTrip(dependent, seatingClass, trip_id);
      if (isNaN(returnedID)) {
        return { errors: { database: returnedID } };
      }
    } else {
      console.log(`${dependent} is not a valid ID`);
    }
  }
  redirect(`/booking/thankyou`);
}

export async function completePaymentAction(paymentID) {
  await completePayment(paymentID);
}

function validateUserID(userID) {
  if (userID.length != 10) return false;
  if (isNaN(userID)) return false;
  return true;
}

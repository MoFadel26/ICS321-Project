"use server"
import { promotePassenger } from "../db";
import { redirect } from "next/navigation";

export async function promotePass(state, formData){
    // console.log("this is the form data " + formData);
    const passenger_id = formData.get("passenger_id");
    const trip_id = formData.get("train_id");
    const date = formData.get("date");
    const seating_class = formData.get("seating_class");
    try {
        const promote = await promotePassenger(passenger_id, trip_id, date, seating_class);
        if (promote) {
            redirect("http://localhost:3000");
        } else {
            return { errors: { database: "Error promoting passenger"}}
        }
    } catch (error) {
        return { errors: { database: error.message }}
    }

}
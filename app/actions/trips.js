"use server";
import { dependentFormSchema } from "../lib/definitions";
import { updateTrip,deleteTripDb, addTripDb } from "../db";
import { redirect } from "next/navigation";

export async function updateTrips(state, formData) {
    // console.log("values of form data: ", formData);
    // console.log("values of form data train id: ", formData.train_id);
    // console.log("values of form data: ", formData.get("trip_id"));
    try {
        const upateTrips = await updateTrip(formData);
        if (upateTrips) {
            redirect("/admin");
        } else {
            return { errors: { database: "Error updating data" } };
        }
    } catch (error) {
        return { errors: { database: error.message } };
    }
}

export async function deleteTrip(state, formData) {
    const data = formData.get("trip_id");
    try {
        const deleteTrips = await deleteTripDb(data);
        if (deleteTrips) {
            redirect("/admin");
        } else {
            return { errors: { database: "Error updating data" } };
        }
    } catch (error) {
        return { errors: { database: error.message } };
    }
}

export async function addTrip(state, formData) {
    // console.log("this is the formdata in addtrip");
    //
    // for (let [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
    try {
        const addTrips = await addTripDb(formData);
        if (addTrips) {
            redirect("/admin");
        } else {
            return { errors: { database: "Error adding data" } };
        }
    } catch (error) {
        return { errors: { database: error.message } };
    }
}

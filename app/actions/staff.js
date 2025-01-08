"use server";
import { insertStaff } from "../db";
import { redirect } from "next/navigation";

export async function addStaff(state, formData) {
    const trainId = formData.get("train_id");
    const staffID = formData.get("staff_id");
    try {
        const staff = await insertStaff(staffID,trainId);
        if (staff) {
            redirect("/admin");
        } else {
            return { errors: { database: "Error inserting data" } };
        }
    } catch (error) {
        return { errors: { database: error.message } };
    }
}
"use server";
import { dependentFormSchema } from "../lib/definitions";
import { insertDependent, deleteDependent } from "../db";
import { redirect } from "next/navigation";

export async function addDependent(state, formData) {
  const validatedFields = dependentFormSchema.safeParse({
    national_id: formData.get("national_id"),
    name: formData.get("name"),
    sex: formData.get("sex"),
    relationship: formData.get("relationship"),
    passenger_id: formData.get("passenger_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const dependent = await insertDependent(validatedFields.data);

  if (dependent == true) {
    redirect("/passenger");
  } else {
    //Error print it
    return { errors: { database: dependent } };
  }
}

export async function deleteDependentAction(dependentID) {
  await deleteDependent(dependentID);
}

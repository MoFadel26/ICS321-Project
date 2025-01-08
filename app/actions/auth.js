// TODO
// We will not do hashing
"use server";
import { SignupFormSchema, LoginFormSchema } from "../lib/definitions";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import { fetchUser } from "../db";

export async function signup(state, formData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const data = await pool.query(
    `INSERT INTO passanger(email) VALUES ('${email}') RETURNING *`
  );

  const user = data.rows[0];

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.email);

  redirect("/");
}

export async function login(state, formData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const { email, password } = validatedFields.data;

  const user = await fetchUser(email.toLowerCase(), password);
  //no user found in the database
  if (!user) {
    return {
      errors: { auth: "Invalid informations" },
    };
  }
  await createSession(user);

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

// Created by Omar Aljohani
import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a vaild email." }).trim(),
  password: z.string(),
});

export const dependentFormSchema = z.object({
  national_id: z
    .string({
      message: "National ID is required!",
    })
    .length(10, {
      message: "National ID must be 10 character long!",
    })
    .trim(),
  name: z
    .string({
      message: "Dependent name is required!",
    })
    .min(2, {
      message: "The name must be longer than 2 character",
    })
    .trim(),
  sex: z.string(),
  relationship: z.string(),
  passenger_id: z.string(),
});

export const bookingFormSchema = z.object({
  trip_id: z.string(),
  seating_class: z.string(),
  user_id: z.string(),
});

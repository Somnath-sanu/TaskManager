"use server";

import dbConnect from "@/lib/dbConnect";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { UserModel } from "@/models/User";
import bcryptjs from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function signup(credentials: SignUpValues) {
  try {
    await dbConnect();

    const { success, error } = signUpSchema.safeParse(credentials);
    if (!success) {
      return {
        error: error.errors[0].message,
      };
    }

    const { username, email, password } = credentials;

    const passwordHash = await bcryptjs.hashSync(password, 10);

    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      return {
        error: "Username already taken",
      };
    }

    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    const newUser = new UserModel({
      username,
      email,
      password: passwordHash,
    });

    await newUser.save();

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET!);
    cookies().set("token", token);

    return {
      message: "Success",
    };
    
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.log(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

"use server";

import dbConnect from "@/lib/dbConnect";
import { loginSchema, LoginValues } from "@/lib/validation";
import { UserModel } from "@/models/User";
import bcryptjs from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function login(credentials: LoginValues) {
  try {
    await dbConnect();
    const { username, password } = loginSchema.parse(credentials);

    const user = await UserModel.findOne({
      username,
    });

    if (!user) {
      return {
        error: "Incorrect username or password",
      };
    }

    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!);
    cookies().set("token", token);

    return {
      message: "Success"
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.log(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

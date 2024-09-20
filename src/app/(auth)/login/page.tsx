"use client";
import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./_components/LoginForm";
import { useTodos } from "@/store/useTodo";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useTodos();
  const router = useRouter();

 
  

  if (user) {
    router.replace("/inbox");
    return;
  }
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl  shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Login to TaskManager</h1>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
        <img
          src="/Studying.jpeg"
          alt=""
          className="hidden w-1/2 overflow-hidden rounded-3xl shadow-sm md:block"
        />
      </div>
    </main>
  );
}

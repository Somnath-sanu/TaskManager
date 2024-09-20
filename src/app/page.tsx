"use client";

import { useTodos } from "@/store/useTodo";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useTodos();
  const router = useRouter();

  if (!user) {
    router.replace("/login");
  } else {
    router.replace("/inbox");
  }

  return <Loader2 className="mx-auto my-3 animate-spin" />;
}

"use client";

import { useTodos } from "@/store/useTodo";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useTodos();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/inbox");
    }
  }, [user,router]);

  return <Loader2 className="mx-auto my-3 animate-spin" />;
}

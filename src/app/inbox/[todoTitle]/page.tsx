"use client";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTodos } from "@/store/useTodo";
import { CircleArrowLeft } from "lucide-react";
import moment from "moment";

import { useRouter } from "next/navigation";
import React from "react";

function Page({ params: { todoTitle } }: { params: { todoTitle: string } }) {
  const { todos } = useTodos();

  const todo = todos.find((t) => t.taskTitle === decodeURIComponent(todoTitle));

  const { toast } = useToast();
  const router = useRouter();

  const isTodo = !!todo;

  if (!isTodo) {
    toast({
      description: "No task found",
      variant: "destructive",
    });
    router.replace("/inbox");
    return;
  }

  return (
    <div className="flex w-full max-w-[730px] flex-col gap-5 mx-auto">
      <div className="min-h-[52px] min-w-full flex-nowrap  flex w-full items-center justify-start gap-2 px-4 shadow-sm">
        <span
          className="flex gap-2 hover:text-neutral-400 cursor-pointer"
          onClick={() => {
            router.push("/inbox");
          }}
        >
          <CircleArrowLeft className="" />
          Go Back
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-lg bg-cover p-5 shadow-xl">
        <div className="space-y-2">
          <div className="flex gap-1 items-center">
            <span className="font-bold text-lg">Task Title :</span>
            <p className="line-clamp-1 text-2xl font-bold">{todo.taskTitle}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              {!!todo.description && (
                <div className="flex gap-1 flex-col">
                  <span className="font-bold text-lg">Description :</span>
                  <p className="text-sm  text-blue-100 font-medium text-wrap break-all whitespace-pre-line ">
                    {todo.description}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 pt-3">
              <div className="flex items-center gap-2 ">
                <span className="font-light text-[#eb7803]">Priority :</span>
                {todo.priority === "High" && (
                  <Badge className="bg-red-500">{todo.priority}</Badge>
                )}
                {todo.priority === "Medium" && (
                  <Badge className="bg-yellow-500">{todo.priority}</Badge>
                )}
                {todo.priority === "Low" && (
                  <Badge className="bg-green-500">{todo.priority}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 ">
                <span className="font-light text-[#58cafa]">Status :</span>
                {todo.status === "Completed" && (
                  <Badge className="bg-green-500">{todo.status}</Badge>
                )}
                {todo.status === "In Progress" && (
                  <Badge className="bg-yellow-500">{todo.status}</Badge>
                )}
                {todo.status === "To Do" && <Badge>{todo.status}</Badge>}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="font-light text-[#f2d530]">Due date :</span>
            <p>{moment(todo.dueDate).format("LL")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

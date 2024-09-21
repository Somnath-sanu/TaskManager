"use client";

import { motion } from "framer-motion";

import { useTodos } from "@/store/useTodo";
import { CircleArrowLeft, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

//TODO: Fix any

export default function Page() {
  const router = useRouter();
  const { user } = useTodos();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  return (
    <div className="w-full text-neutral-50">
      <div className="min-h-[52px] min-w-full flex-nowrap bg-dark-100 flex w-full items-center justify-between gap-2 px-4 shadow-sm">
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
      <Board />
    </div>
  );
}

function Board() {
  return (
    <div className="flex  w-full gap-8 overflow-hidden p-12 mx-auto justify-center select-none sm:flex-row  ">
      <Column title="To Do" headingColor="text-neutral-500" />
      <Column title="In Progress" headingColor="text-yellow-200" />
      <Column title="Completed" headingColor="text-green-500" />
    </div>
  );
}
function Column({
  title,
  headingColor,
}: {
  title: string;
  headingColor: string;
}) {
  const { todos, updateTodoStatus } = useTodos();

  const handleDragStart = (e: any, card: any) => {
    e.dataTransfer.setData("cardId", card.taskTitle);
  };

  const handleDrop = (e: any) => {
    const taskId = e.dataTransfer.getData("cardId");
    updateTodoStatus(taskId, title); // Update the task's status when dropped in a column
  };

  const handleDragOver = (e: any) => e.preventDefault();

  const filteredTodos = todos.filter((todo) => todo.status === title);

  return (
    <div
      className="sm:w-56 shrink-0 w-26"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="mb-3 flex items-center justify-between border-r shadow-md gap-2 px-2">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-lg text-neutral-400">
          {filteredTodos.length}
        </span>
      </div>

      <ScrollArea className="h-full sm:max-h-[450px] max-h-[550px] w-full bg-neutral-800/0">
        {filteredTodos.map((todo) => (
          <div key={todo.taskTitle} className="pb-2">
            <Card {...todo} handleDragStart={handleDragStart} />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

function Card({
  taskTitle,
  handleDragStart,
}: {
  taskTitle: string;
  handleDragStart: any;
}) {
  const { deleteTodo } = useTodos();
  return (
    <>
      <motion.div
        layout
        layoutId={taskTitle}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { taskTitle })}
        className="relative cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100 break-all flex-none w-16 sm:w-full mt-1.5">{taskTitle}</p>
        <div
          className="absolute   top-1 right-1  cursor-pointer ps-2 "
          onClick={() => {
            deleteTodo(taskTitle);
          }}
        >
          <Trash className=" size-4 hover:text-red-500" />
        </div>
      </motion.div>
    </>
  );
}

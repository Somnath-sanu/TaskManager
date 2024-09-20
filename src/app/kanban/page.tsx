"use client";

import { motion } from "framer-motion";

import { useTodos } from "@/store/useTodo";
import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

//TODO: Fix any

export default function Page() {
  const router = useRouter();
  const { user } = useTodos();

  if (!user) {
    router.replace("/login");
    return;
  }

  return (
    <div className="h-screen w-full text-neutral-50">
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
    <div className="flex h-full w-full gap-8 overflow-scroll p-12 mx-auto justify-center select-none ">
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

  console.log(todos);

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
      className="w-56 shrink-0"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="mb-3 flex items-center justify-between border-r shadow-md p-2">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-lg text-neutral-400">
          {filteredTodos.length}
        </span>
      </div>

      <div className="h-full w-full bg-neutral-800/0">
        {filteredTodos.map((todo) => (
          <div key={todo.taskTitle} className="pb-2">
            <Card {...todo} handleDragStart={handleDragStart} />
          </div>
        ))}
      </div>
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
  return (
    <>
      <motion.div
        layout
        layoutId={taskTitle}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { taskTitle })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{taskTitle}</p>
      </motion.div>
    </>
  );
}

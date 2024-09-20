"use client";

import Header from "@/components/Header";

import Image from "next/image";
import { useTodos } from "@/store/useTodo";
import { Delete, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import AddTaskDialog from "@/components/AddTaskDialog";

function Page() {
  const {
    todos,
    setTodos,
    setOpen,
    setEditData,
    setMode,
    deleteTodo,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortByDueDate,
    setSortByDueDate,
    user,
    open,
  } = useTodos();

  const router = useRouter();

  console.log({
    open,
  });

  if (!user) {
    router.replace("/login");
    return;
  }

  const filteredAndSortedTodos = todos
    .filter((todo) => {
      if (filterStatus !== "All" && todo.status !== filterStatus) return false;
      if (filterPriority !== "All" && todo.priority !== filterPriority)
        return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortByDueDate === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <main className="relative flex max-h-screen transition-all w-full flex-col items-center gap-5 sm:gap-10">
      <Header className={"fixed left-0 top-0"} />

      {!!todos.length && (
        <div className="flex justify-between w-full max-w-[690px] p-4 rounded-xl  mt-[99px] font-light sm:flex-row flex-col">
          <div className="flex gap-4 text-black  justify-center">
            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 rounded-lg bg-[#e5e5e5] cursor-pointer border-none outline-none"
            >
              <option value="All">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Filter by Priority */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="p-2 rounded-lg bg-[#e5e5e5]  cursor-pointer border-none outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Sort by Due Date */}
          <div className="flex items-center justify-center my-2 sm:my-0">
            <select
              value={sortByDueDate}
              onChange={(e) =>
                setSortByDueDate(e.target.value as "asc" | "desc")
              }
              className="text-black p-2 rounded-lg bg-[#e5e5e5]  cursor-pointer border-none outline-none"
            >
              <option value="asc">Due Date: Ascending</option>
              <option value="desc">Due Date: Descending</option>
            </select>
          </div>
        </div>
      )}

      {filteredAndSortedTodos.length > 0 ? (
        <ScrollArea className="h-[calc(100vh-160px)] max-w-[730px]  w-full">
          <div className="flex flex-col items-center mb-10 w-full gap-10 px-5 ">
            <ul
              className="flex w-full  flex-col gap-5 mt-4 "
              title="click to view detail"
            >
              {filteredAndSortedTodos.map((todo, id) => (
                <li
                  className="flex items-center justify-between gap-3 rounded-lg  bg-cover p-5 hover:shadow-xl shadow-lg"
                  key={id}
                >
                  <Link href={`/inbox/${todo.taskTitle}`} className="w-full">
                    <div className="space-y-2">
                      <p className="line-clamp-1 text-lg font-bold">
                        {todo.taskTitle}
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="max-w-[50%] w-full">
                          {!!todo.description && (
                            <p className="text-sm font-light text-blue-100 font-serif line-clamp-1">
                              {todo.description}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 ">
                            <span className="font-light text-[#eb7803]">
                              Priority :
                            </span>
                            {todo.priority === "High" && (
                              <Badge className="bg-red-500">
                                {todo.priority}
                              </Badge>
                            )}
                            {todo.priority === "Medium" && (
                              <Badge className="bg-yellow-500">
                                {todo.priority}
                              </Badge>
                            )}
                            {todo.priority === "Low" && (
                              <Badge className="bg-green-500">
                                {todo.priority}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ">
                            <span className="font-light text-[#58cafa]">
                              Status :
                            </span>
                            {todo.status === "Completed" && (
                              <Badge className="bg-green-500">
                                {todo.status}
                              </Badge>
                            )}
                            {todo.status === "In Progress" && (
                              <Badge className="bg-yellow-500">
                                {todo.status}
                              </Badge>
                            )}
                            {todo.status === "To Do" && (
                              <Badge>{todo.status}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-light text-[#f2d530] flex-none">
                          Due date :
                        </span>
                        <p>{moment(todo.dueDate).format("LL")}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex gap-2">
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="flex justify-center items-center hover:bg-red-500"
                      onClick={() => {
                        deleteTodo(todo.taskTitle);
                      }}
                    >
                      <Trash className="size-5" />
                    </Button>
                    <AddTaskDialog open={open} setOpen={setOpen}>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="flex justify-center items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMode("EDIT");
                          setEditData(todo);
                          setOpen(true);
                          console.log("Edit clicked, opening dialog");
                        }}
                      >
                        <Pencil className="size-5" />
                      </Button>
                    </AddTaskDialog>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      ) : (
        <div className="flex w-full max-w-[730px]  items-center justify-center gap-5 rounded-lg bg-dark-200 px-10 py-8 select-none">
          <div className=" my-auto w-full mx-auto flex gap-2 items-center flex-col mt-20">
            <Image
              src={
                "https://plus.unsplash.com/premium_photo-1681487870238-4a2dfddc6bcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG8lMjBkbyUyMGxpc3R8ZW58MHx8MHx8fDA%3D"
              }
              alt="Logo with name"
              width={120}
              height={32}
              className="size-16 rounded-full"
            />
            <p className="font-medium text-lg">
              {" "}
              {filterStatus !== "All" || filterPriority !== "All"
                ? "No Tasks Found 😔"
                : "No Tasks Yet!"}{" "}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Page;

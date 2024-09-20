import { AddTaskWrapper } from "@/app/inbox/AddTaskWrapper";
import { cn } from "@/lib/utils";
import { Kanban, ListCollapse, ListTodo, LogOutIcon } from "lucide-react";

import Link from "next/link";

import { Button } from "./ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Header = ({ className }: HeaderProps) => {
  return (
    <div
      className={cn(
        "min-h-[92px] min-w-full flex-nowrap bg-dark-100 flex w-full items-center justify-between gap-2 px-4",
        className
      )}
    >
      <Link
        href={"/inbox"}
        className="overflow-hidden flex justify-center gap-2"
      >
        <ListTodo className="size-6" />
        <h1 className="font-bold">TaskMaster</h1>
      </Link>
      <div className="w-fit flex items-center justify-end sm:pr-20 cursor-pointer">
        <DashDetails />
      </div>
    </div>
  );
};

export default Header;

function KanbanBoard() {
  return (
    <Link href={`/kanban`} className="w-full flex ">
      <Button className="flex hover:shadow-md" variant={"secondary"}>
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <div className="flex items-center gap-2 justify-center p-3">
            <Kanban className="h-4 w-4 text-primary" />
            <h3 className="text-base font-semibold tracking-tight text-foreground/70">
              Board
            </h3>
          </div>
        </div>
      </Button>
    </Link>
  );
}

function DashDetails() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ListCollapse className="size-6" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 items-center justify-center max-w-[160px] bg-slate-800 border-none">
        <div>
          <AddTaskWrapper />
        </div>

        <div className="">
          <KanbanBoard />
        </div>

        <div className="">
          <Button
            className="pl-2 flex flex-1 hover:shadow-md"
            variant={"secondary"}
           
          >
            <div className="flex flex-col items-center justify-center gap-1 text-center">
              <div className="flex items-center gap-2 justify-center p-3">
                <LogOutIcon className="h-4 w-4 text-primary" />
                <h3 className="text-base font-semibold tracking-tight text-foreground/70">
                  Logout
                </h3>
              </div>
            </div>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

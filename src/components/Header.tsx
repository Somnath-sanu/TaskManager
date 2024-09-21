import { AddTaskWrapper } from "@/app/inbox/AddTaskWrapper";
import { cn } from "@/lib/utils";
import { Kanban, ListCollapse, ListTodo, LogOutIcon } from "lucide-react";

import Link from "next/link";

import { Button } from "./ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useTodos } from "@/store/useTodo";
import { useRouter } from "next/navigation";

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

        <LogoutDialog>
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
        </LogoutDialog>
      </PopoverContent>
    </Popover>
  );
}

function LogoutDialog({ children }: { children: React.ReactNode }) {
  const { reset } = useTodos();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="dark border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              reset();
              router.replace("/login");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

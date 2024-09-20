"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Plus } from "lucide-react";
import AddTaskDialog from "@/components/AddTaskDialog";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/store/useTodo";

export function AddTaskWrapper() {
  const { open, setOpen, setMode } = useTodos();

  console.log({
    open
  });

  return (
    <AddTaskDialog open={open} setOpen={setOpen}>
      <Button
        className=" flex  hover:shadow-md"
        variant={"secondary"}
        onClick={(e) => {
          setMode("ADD");
          setOpen(true);
        }}
      >
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <div className="flex items-center gap-2 justify-center">
            <Plus className="h-4 w-4 text-primary" />
            <h3 className="text-base font-semibold tracking-tight text-foreground/70">
              Add Task
            </h3>
          </div>
        </div>
      </Button>
    </AddTaskDialog>
  );
}

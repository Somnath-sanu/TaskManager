import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { CalendarIcon, Text } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useTodos } from "@/store/useTodo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const FormSchema = z.object({
  taskTitle: z.string().min(1, {
    message: "Task name must be at least 1 characters.",
  }),
  description: z.string().optional().default(""),
  dueDate: z.date({ required_error: "A due date is required" }),
  priority: z.string().min(1, { message: "Please select a priority" }),
  status: z.string().min(1, { message: "Please select status" }),
});

export default function AddTaskDialog({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const { toast } = useToast();

  const { setTodos, mode, editData, todos } = useTodos();

 

  let defaultValues = {
    taskTitle: "",
    description: "",
    status: "To Do",
    priority: "High",
    dueDate: new Date(),
  };

  if (mode === "EDIT") defaultValues = editData;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (mode === "EDIT" && editData) {
      form.reset(editData);
    } else {
      form.reset(defaultValues);
    }
  }, [editData, mode, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { taskTitle, description, priority, dueDate, status } = data;

    if (taskTitle.length > 15) {
      toast({
        description: "Task title cannot be more than 15 characters",
        variant: "destructive",
      });
      return;
    }

    const exixts = todos.find((t) => t.taskTitle === taskTitle);
    const isExist = !!exixts;
    if (!!isExist && mode === "ADD") {
      toast({
        description: "Todo with this name already exists",
        variant: "destructive",
      });
      return;
    }

    setTodos(data);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="shadow-xl">
        <DialogTitle>
          <div className=" text-black rounded-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2  p-2 border-gray-200 my-2 rounded-xl px-3 pt-4 border-foreground/20 overflow-hidden"
              >
                <FormField
                  control={form.control}
                  name="taskTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="taskTitle"
                          type="text"
                          placeholder="Enter Task title"
                          required
                          className="border-0 font-semibold text-lg"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-start gap-2">
                          <Text className="ml-auto h-4 w-4 opacity-50" />
                          <Textarea
                            id="description"
                            placeholder="Description"
                            className="resize-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-2 items-center">
                    <span className="font-extralight text-sm">
                      Select Due Date :
                    </span>
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "flex gap-2 w-[220px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extralight text-sm">
                      Select Priority :
                    </span>
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {["Low", "Medium", "High"].map((item, idx) => (
                                <SelectItem key={idx} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extralight text-sm">
                      Select Status :
                    </span>
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {["To Do", "In Progress", "Completed"].map(
                                (item, idx) => (
                                  <SelectItem key={idx} value={item}>
                                    {item}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mx-auto w-full text-end mt-3">
                  <Button className="px-6 py-4" type="submit">
                    {mode === "ADD" ? "Add task" : "Edit task"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}

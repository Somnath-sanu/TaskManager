import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Todo = {
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  taskTitle: string;
};
interface TodoProps {
  todos: Todo[];
  setTodos: (todo: Todo) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
  mode: "EDIT" | "ADD";
  setMode: (val: "EDIT" | "ADD") => void;
  editData: Todo;
  setEditData: (val: Todo) => void;
  deleteTodo: (todoTitle: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterPriority: string;
  setFilterPriority: (priority: string) => void;
  sortByDueDate: string;
  setSortByDueDate: (order: "asc" | "desc") => void;
  updateTodoStatus: (taskId: string, newStatus: string) => void;
  user: boolean;
  setUser: (val: boolean) => void;
  reset: () => void;
}

export const useTodos = create<TodoProps>()(
  persist(
    (set) => ({
      todos: [],
      setTodos(todo) {
        set((prev) => {
          if (prev.mode === "EDIT") {
            // If in EDIT mode, update the existing todo
            return {
              todos: prev.todos.map((t) =>
                t.taskTitle === prev.editData.taskTitle ? todo : t
              ),
            };
          }
          // Otherwise, add a new todo
          return { todos: [...prev.todos, todo] };
        });
      },
      open: false,
      setOpen: (val: boolean) => set({ open: val }),
      mode: "ADD",
      setMode(val: "EDIT" | "ADD") {
        set({ mode: val });
      },
      editData: {
        taskTitle: "",
        description: "",
        status: "To Do",
        priority: "High",
        dueDate: new Date(),
      },
      setEditData: (val: Todo) => set({ editData: val }),
      deleteTodo(todoTitle) {
        set((prev) => ({
          todos: prev.todos.filter((t) => t.taskTitle !== todoTitle),
        }));
      },
      filterStatus: "All",
      setFilterStatus: (status: string) => set({ filterStatus: status }),
      filterPriority: "All",
      setFilterPriority: (priority: string) =>
        set({ filterPriority: priority }),
      sortByDueDate: "asc",
      setSortByDueDate: (order: "asc" | "desc") =>
        set({ sortByDueDate: order }),
      updateTodoStatus: (taskId, newStatus) => {
        set((prev) => ({
          todos: prev.todos.map((todo) =>
            todo.taskTitle === taskId ? { ...todo, status: newStatus } : todo
          ),
        }));
      },
      user: false,
      setUser: (val) => set({ user: val }),
      reset: () => {
        // Clear all data and local storage
        set({ todos: [], open: false, mode: "ADD", user: false });
        // Clear persisted state from local storage
        localStorage.removeItem("todo-data");
      },
    }),

    {
      name: "todo-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

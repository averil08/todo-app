export type TodoStatus = "NOT_STARTED" | "PENDING" | "DONE";

export type Todo = {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
};
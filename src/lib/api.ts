import type { Todo, TodoStatus } from "@/types/todo";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const res = await fetch(`${BASE_URL}/api/todos`);
    if (!res.ok) throw new Error("Failed to fetch todos");
    const data = await res.json();
    return data.message; // unwrap the message field
  },

  create: async (data: { title: string; description?: string }): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create todo");
    const result = await res.json();
    return result.message; // unwrap
  },

  update: async (id: number, data: { title: string; description?: string; status: TodoStatus }): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    const result = await res.json();
    return result.message; // unwrap
  },

  patch: async (id: number, status: TodoStatus): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to patch todo");
    const result = await res.json();
    return result.message; // unwrap
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete todo");
  },
};
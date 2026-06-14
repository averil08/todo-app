"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { todoApi } from "@/lib/api";
import type { Todo } from "@/types/todo";
import TodoTable from "@/components/todos/TodoTable";
import CreateTodoDialog from "@/components/todos/CreateTodo";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    todoApi.getAll()
      .then(setTodos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleCreated = (todo: Todo) => setTodos((prev) => [todo, ...prev]);

  const handleUpdated = (updated: Todo) =>
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

  const handleDeleted = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {todos.length} task{todos.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CreateTodoDialog onCreated={handleCreated} />
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading tasks...</p>
      ) : (
        <TodoTable
          todos={todos}
          onUpdated={handleUpdated}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}
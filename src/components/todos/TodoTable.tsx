"use client";

import { useState } from "react";
import type { Todo } from "@/types/todo";
import TodoRow from "./TodoRow";
import EditTodoDialog from "./EditTodo";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  todos: Todo[];
  onUpdated: (todo: Todo) => void;
  onDeleted: (id: number) => void;
};

export default function TodoTable({ todos, onUpdated, onDeleted }: Props) {
  const [editTarget, setEditTarget] = useState<Todo | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.length === 0 ? (
            <TableRow>
              <td colSpan={5} className="text-center py-10 text-muted-foreground">
                No tasks yet. Create one to get started.
              </td>
            </TableRow>
          ) : (
            todos.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                onUpdated={onUpdated}
                onDeleted={onDeleted}
                onEdit={setEditTarget}
              />
            ))
          )}
        </TableBody>
      </Table>

      <EditTodoDialog
        todo={editTarget}
        open={!!editTarget}
        onOpenChange={(open) => { if (!open) setEditTarget(null); }}
        onUpdated={(updated) => {
          onUpdated(updated);
          setEditTarget(null);
        }}
      />
    </>
  );
}
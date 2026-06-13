"use client";

import type { Todo, TodoStatus } from "@/types/todo";
import { todoApi } from "@/lib/api";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const STATUS_CYCLE: Record<TodoStatus, TodoStatus> = {
  NOT_STARTED: "PENDING",
  PENDING: "DONE",
  DONE: "NOT_STARTED",
};

const STATUS_LABEL: Record<TodoStatus, string> = {
  NOT_STARTED: "Not Started",
  PENDING: "Pending",
  DONE: "Done",
};

const STATUS_VARIANT: Record<TodoStatus, "secondary" | "outline" | "default"> = {
  NOT_STARTED: "secondary",
  PENDING: "outline",
  DONE: "default",
};

type Props = {
  todo: Todo;
  onUpdated: (todo: Todo) => void;
  onDeleted: (id: number) => void;
  onEdit: (todo: Todo) => void;
};

export default function TodoRow({ todo, onUpdated, onDeleted, onEdit }: Props) {
  const handleToggleStatus = async () => {
    try {
      const next = STATUS_CYCLE[todo.status];
      const updated = await todoApi.patch(todo.id, next);
      onUpdated(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await todoApi.delete(todo.id);
      onDeleted(todo.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{todo.title}</TableCell>
      <TableCell className="text-muted-foreground text-sm">
        {todo.description ?? "—"}
      </TableCell>
      <TableCell>
        <Badge
          variant={STATUS_VARIANT[todo.status]}
          className="cursor-pointer select-none"
          onClick={handleToggleStatus}
          title="Click to cycle status"
        >
          {STATUS_LABEL[todo.status]}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {new Date(todo.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(todo)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
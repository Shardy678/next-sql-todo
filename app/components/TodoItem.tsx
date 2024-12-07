"use client"

import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Todo } from './TodoList'

interface TodoItemProps {
  todo: Todo
  onDelete: (id: number) => void
  onUpdate: (id: number, updatedTodo: Todo) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(todo.id)
  }

  const handleUpdate = (checked: boolean) => {
    onUpdate(todo.id, { ...todo, completed: checked })
  }

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm mb-2 group hover:bg-accent transition-colors">
      <div className="flex items-center space-x-3">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={handleUpdate}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
          }`}
        >
          {todo.title}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}

export default TodoItem


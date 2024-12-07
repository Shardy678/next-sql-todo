"use client";

import React, { useState, useEffect, ReactEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import TodoItem from "./TodoItem";
import { getData, addTodo, deleteTodo, updateTodo } from "../lib/db";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getData();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      await addTodo(newTodo, false);
      setNewTodo("");
      const data = await getData();
      setTodos(data);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    const data = await getData();
    setTodos(data);
  };

  const handleUpdateTodo = async (id: number, updatedTodo: Todo) => {
    await updateTodo(id, updatedTodo.title, updatedTodo.completed);
    const data = await getData();
    setTodos(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTodo} className="flex space-x-2 mb-4">
            <Input
              type="text"
              value={newTodo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTodo(e.target.value)
              }
              placeholder="Add a new todo"
              className="flex-grow"
            />
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </form>
          <div className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;

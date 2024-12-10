import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoList from "../app/components/TodoList";
import * as db from "../app/lib/db";
import "@testing-library/jest-dom";

jest.mock("../app/lib/db");

describe("TodoList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TodoList component", () => {
    render(<TodoList />);
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add a new todo/i)).toBeInTheDocument();
  });

  it("adds a new todo", async () => {
    (db.getData as jest.Mock).mockResolvedValueOnce([]);
    (db.addTodo as jest.Mock).mockResolvedValueOnce(undefined);
    (db.getData as jest.Mock).mockResolvedValueOnce([
      { id: 1, title: "Test Todo", completed: false },
    ]);

    render(<TodoList />);

    fireEvent.change(screen.getByPlaceholderText(/Add a new todo/i), {
      target: { value: "Test Todo" },
    });
    fireEvent.click(screen.getByText(/Add/i));

    await waitFor(() =>
      expect(screen.getByText("Test Todo")).toBeInTheDocument()
    );
  });

  it("deletes a todo", async () => {
    (db.getData as jest.Mock).mockResolvedValueOnce([
      { id: 1, title: "Test Todo", completed: false },
    ]);
    (db.deleteTodo as jest.Mock).mockResolvedValueOnce(undefined);
    (db.getData as jest.Mock).mockResolvedValueOnce([]);
    render(<TodoList />);

    await waitFor(() =>
      expect(screen.getByText("Test Todo")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() =>
      expect(screen.queryByText("Test Todo")).not.toBeInTheDocument()
    );
  });

  it("updates a todo", async () => {
    const updatedTodo = { id: 1, title: "Updated Todo", completed: false };
    (db.getData as jest.Mock).mockResolvedValueOnce([
      { id: 1, title: "Test Todo", completed: false },
    ]);
    (db.updateTodo as jest.Mock).mockResolvedValueOnce(undefined);
    (db.getData as jest.Mock).mockResolvedValueOnce([updatedTodo]);

    render(<TodoList />);

    await waitFor(() =>
      expect(screen.getByText("Test Todo")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByPlaceholderText(/Add a new todo/i), {
      target: { value: "Updated Todo" },
    });
    fireEvent.click(screen.getByText(/Add/i));
    await waitFor(() =>
      expect(screen.getByText("Updated Todo")).toBeInTheDocument()
    );
  });
});

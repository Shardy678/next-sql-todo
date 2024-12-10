import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "@/app/components/TodoItem";
import "@testing-library/jest-dom";

const mockTodo = {
  id: 1,
  title: "Test Todo",
  completed: false,
};

const mockOnDelete = jest.fn();
const mockOnUpdate = jest.fn();

describe("TodoItem", () => {
  beforeEach(() => {
    render(
      <TodoItem
        todo={mockTodo}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );
  });

  it("renders the todo title", () => {
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it("calls onUpdate when checkbox is checked", () => {
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnUpdate).toHaveBeenCalledWith(mockTodo.id, {
      ...mockTodo,
      completed: true,
    });
  });
});

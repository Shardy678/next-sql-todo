import { neon } from "@neondatabase/serverless";
import { Todo } from '../components/TodoList';

export async function getData(): Promise<Todo[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set");
    return [];
  }
  const sql = neon(databaseUrl);
  
  const result = await sql`SELECT id, title, completed FROM todos` as Todo[];
  
  return result;
}

export async function addTodo(title: string, completed: boolean) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set");
    return;
  }
  const sql = neon(databaseUrl);
  await sql`INSERT INTO todos (title, completed) VALUES (${title}, ${completed})`;
}

export async function deleteTodo(id: number) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set");
    return;
  }
  const sql = neon(databaseUrl);
  await sql`DELETE FROM todos WHERE id = ${id}`;
}

export async function updateTodo(id: number, title: string, completed: boolean) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set");
    return;
  }
  const sql = neon(databaseUrl);
  await sql`UPDATE todos SET title = ${title}, completed = ${completed} WHERE id = ${id}`;
}

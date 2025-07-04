"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      // Only fetch todos when user is signed in
      client.models.Todo.observeQuery().subscribe({
        next: (data) => setTodos([...data.items]),
      });
    }
  }, [user]);

  async function createTodo() {
    const content = window.prompt("Todo content");
    if (!content) return;
    try {
      await client.models.Todo.create({
        content,
        owner: user?.userId,
      });
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <Authenticator socialProviders={['google']}>
      {({ signOut, user }) => {
        // Set user state when authenticated
        if (!user) setUser(user);

        return (
          <main>
            <h1>My todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
              {todos.map((todo) => (
                <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                  {todo.content}
                </li>
              ))}
            </ul>
            <div>
              🥳 App successfully hosted. Try creating a new todo.
              <br />
              <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
                Review next steps of this tutorial.
              </a>
            </div>
            <button onClick={signOut}>Sign out</button>
          </main>
        );
      }}
    </Authenticator>
  );
}

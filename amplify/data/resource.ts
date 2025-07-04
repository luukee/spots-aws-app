import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/**
 * Data schema for the SPOTS application.
 * Defines the structure for users and other application data.
 */
const schema = a.schema({
  /**
   * User model to store additional user information beyond Cognito auth.
   * Maps to the Firebase 'users' collection structure.
   */
  User: a
    .model({
      email: a.string().required(),
      role: a.string().default('user'), // Default role for new users
      givenName: a.string(), // Optional by default
      familyName: a.string(), // Optional by default
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      // Users can read, create, and update their own data
      allow.owner().to(['read', 'create', 'update']),
      // For now, let's keep it simple - we'll add admin functionality later
    ])
    .identifier(['email']), // Use email as the unique identifier

  /**
   * Todo model (keeping the example for reference)
   */
  Todo: a
    .model({
      content: a.string(),
      owner: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

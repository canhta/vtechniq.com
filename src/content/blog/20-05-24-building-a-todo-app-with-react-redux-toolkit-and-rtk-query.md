---
title: Building a ToDo App with React, Redux Toolkit, and RTK Query
pubDate: 05/20/2024 20:00
author: 'Canh Ta'
tags:
  - React
  - Redux Toolkit
  - Frontend Development
imgUrl: '../../assets/posts/techlead-vs-pm.jpg'
description: 'Learn how to build a simple and efficient ToDo app using React, Redux Toolkit, and RTK Query.'
layout: '../../layouts/BlogPost.astro'
---

This step-by-step guide covers project setup, state management, and data fetching with RTK Query to create a robust and scalable application.

### Set up a new React project with TypeScript:

```bash
npx create-react-app todo-app --template typescript
cd todo-app
npm install @reduxjs/toolkit react-redux
```

### Configuring Redux Toolkit with RTK Query

Create a Redux store and set up RTK Query with TypeScript.

**Create the store:**

Create a new file `src/app/store.ts` and configure the Redux store.

```typescript
// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { todosApi } from '../features/todos/todosApi';

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Create an API slice:**

Next, create a new file `src/features/todos/todosApi.ts` and define the API slice.

```typescript
// src/features/todos/todosApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Todo {
  id: number;
  title: string;
}

const API_URL = 'https://example.com/api';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } =
  todosApi;
```

### Creating React Components

Now, let's create the React components for displaying and adding todos using TypeScript.

**TodoList Component:**

Create a new file `src/features/todos/TodoList.tsx`.

```typescript
// src/features/todos/TodoList.tsx
import React from 'react';
import { useGetTodosQuery, useDeleteTodoMutation } from './todosApi';

const TodoList: React.FC = () => {
  const { data: todos, error, isLoading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

**AddTodo Component:**

Create another file `src/features/todos/AddTodo.tsx`.

```typescript
// src/features/todos/AddTodo.tsx
import React, { useState } from 'react';
import { useAddTodoMutation } from './todosApi';

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTodo({
      title,
    });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
```

### Connecting Redux to React

**Update the main `index.tsx` file:**

Update `src/index.tsx` to provide the Redux store to the React application.

```typescript
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Combining Components in the App

**Update the main `App.tsx` file:**

Finally, combine the components in `src/App.tsx`.

```typescript
// src/App.tsx
import React from 'react';
import TodoList from './features/todos/TodoList';
import AddTodo from './features/todos/AddTodo';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
```

### Codesandbox

<iframe
  src="https://codesandbox.io/p/devbox/todo-app-7lcwdm?embed=1&file=%2Fsrc%2Ffeatures%2Ftodos%2FtodosApi.ts&showConsole=true"
  style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
  title="todo-app"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### Conclusion

You've now created a basic ToDo app using React, Redux Toolkit, and RTK Query, fully typed with TypeScript. This setup not only simplifies state management but also provides a more declarative approach to data fetching with strong type safety. You can further enhance this app by adding features like editing todos, user authentication, and more complex state management as needed.

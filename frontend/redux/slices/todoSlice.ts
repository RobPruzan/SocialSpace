import { createSlice } from '@reduxjs/toolkit';

type State = {
  todos: {
    id: number;
    text: string;
    completed: boolean;
  }[];
};

const initialState: State = {
  todos: [
    { id: 1, text: 'todo1', completed: false },
    { id: 2, text: 'todo2', completed: false },
    { id: 3, text: 'todo3', completed: false },
  ],
};

export const todoSlice = createSlice({
  initialState: initialState,
  name: 'todo',
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

import { createSlice } from '@reduxjs/toolkit';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoState = {
  todos: Array<Todo>;
};

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
  },
});

export const TodoActions = todoSlice.actions;

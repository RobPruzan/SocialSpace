import { useState, useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from './redux/store';
import { Todo, TodoActions } from './redux/slices/todoSlice';

function App() {
  const todos = useAppSelector((store) => store.todoSlice.todos);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    title: '',
    completed: false,
    id: crypto.randomUUID(),
  });
  const dispatch = useAppDispatch();
  return (
    <>
      <input
        type="text"
        value={currentTodo.title}
        onChange={(e) =>
          setCurrentTodo({
            ...currentTodo,
            title: e.target.value,
          })
        }
      />

      <button
        onClick={() => {
          dispatch(TodoActions.addTodo(currentTodo));
          setCurrentTodo({
            title: '',
            completed: false,
            id: crypto.randomUUID(),
          });
        }}
      >
        Add Todo
      </button>

      {todos.map((todo) => (
        <div>{todo.title}</div>
      ))}
    </>
  );
}

export default App;

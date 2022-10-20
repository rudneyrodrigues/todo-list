import { ReactNode, createContext, useContext, useState } from "react";

type TodoValue = {
  id: number;
  text: string;
  completed: boolean;
}

type TodoCompletedValue = {
  id: number;
}

interface TodoProviderProps {
  children: ReactNode;
}

interface TodoContextProps {
  todos: TodoValue[];
  addTodos: (text: string) => void;
  removeTodos: (id: number) => void;
  completedTodo: (id: number) => void;
  totalCompleted: TodoCompletedValue[];
}

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<TodoValue[]>([]);
  const [totalCompleted, setTotalCompleted] = useState<TodoCompletedValue[]>([]);

  const addTodos = (text: string) => {
    setTodos((prev) => [...prev, { id: new Date().getUTCMilliseconds(), text, completed: false }]);
  }

  const removeTodos = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    setTotalCompleted(prev => prev.filter((todo) => todo.id !== id));
  };

  const completedTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: true} : {...todo}));

    setTotalCompleted(prev => [...prev, { id: id }])
  }

  return (
    <TodoContext.Provider value={{
      todos: todos,
      addTodos,
      removeTodos,
      completedTodo,
      totalCompleted
    }}>
      { children }
    </TodoContext.Provider>
  )
}

export const useTodo = () => {
  const context = useContext(TodoContext);

  return context;
}

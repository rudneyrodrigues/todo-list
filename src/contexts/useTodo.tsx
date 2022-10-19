import { ReactNode, createContext, useContext, useState } from "react";

type TodoValue = {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoProviderProps {
  children: ReactNode;
}

interface TodoContextProps {
  todos: TodoValue[];
  addTodos: (text: string) => void;
  removeTodos: (id: number) => void;
  completedTodo: (id: number) => void;
  totalCompleted: number;
}

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<TodoValue[]>([]);
  const [totalCompleted, setTotalCompleted] = useState(0);

  const addTodos = (text: string) => {
    setTodos((prev) => [...prev, { id: new Date().getUTCMilliseconds(), text, completed: false }]);
  }

  const removeTodos = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    if (totalCompleted > 0) {
      setTotalCompleted(totalCompleted - 1);
    }
  };

  const completedTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: true} : {...todo}));

    setTotalCompleted(totalCompleted + 1);
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

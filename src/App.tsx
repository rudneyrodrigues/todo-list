import classnames from 'classnames';
import { FormEvent, useState } from 'react';
import { CheckCircle, PlusCircle, TrashSimple } from 'phosphor-react';

import { Header } from "./components/Header";

import clipboardImg from './assets/clipboard.svg';
import { useTodo } from './contexts/useTodo';

export const App = (): JSX.Element => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodos, completedTodo, removeTodos, totalCompleted } = useTodo();

  const totalTodos = todos.length;

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();

    if (newTodo.trim() === "") return;

    addTodos(newTodo);
    setNewTodo('');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="px-4">
        <div className="w-full max-w-[736px] -mt-7 mx-auto">
          <form onSubmit={handleAddTodo} className="flex flex-col items-center gap-4 sm:gap-2 sm:flex-row">
            <input type="text" placeholder="Adicionar uma nova tarefa" value={newTodo} onChange={e => setNewTodo(e.target.value)} className="w-full h-14 p-4 rounded-lg bg-gray-500 placeholder-gray-300 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary-dark" />
            <button type="submit" className="w-full h-14 flex items-center justify-center gap-2 px-4 rounded-lg bg-secondary-dark transition-colors hover:bg-secondary-mid focus:bg-secondary-mid focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-secondary-dark sm:w-auto">
              Criar
              <PlusCircle />
            </button>
          </form>

          <div className="mt-16">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-secondary-mid flex items-center gap-2">
                Tarefas criadas
                <span className="bg-gray-400 px-2 py-[2px] rounded-full text-gray-200 text-xs">
                  { totalTodos }
                </span>
              </p>
              <p className="text-sm font-bold text-secondary-mid flex items-center gap-2">
                Concluídas
                { totalTodos === 0 ? (
                  <span className="bg-gray-400 px-2 py-[2px] rounded-full text-gray-200 text-xs">
                    0
                  </span>
                ) : (
                  <span className="bg-gray-400 px-2 py-[2px] rounded-full text-gray-200 text-xs">
                    { totalCompleted } de { totalTodos }
                  </span>
                ) }
              </p>
            </div>

            <div className="mt-6 py-16 flex flex-col items-center justify-center gap-4">
              { todos.length > 0 && todos.length === totalCompleted && (
                <div className="mb-4 flex items-center justify-center gap-2">
                  <CheckCircle className="text-secondary-mid text-2xl" />

                  <p className="text-secondary-mid">
                    Todas as tarefas foram concluídas
                  </p>
                </div>
              ) }

              { todos.length <= 0 ? (
                <>
                  <img src={clipboardImg} alt="Clipboard" />
                  <div>
                    <strong className="block text-gray-300">
                      Você ainda não tem tarefas cadastradas
                    </strong>
                    <span className="text-gray-300">
                      Crie tarefas e organize seus itens a fazer
                    </span>
                  </div>
                </>
              ) : (
                <>
                  { todos.map(todo => {
                    return (
                      <div className="w-full flex items-start rounded-lg p-4 bg-gray-500 border border-gray-400 gap-3" key={todo.id}>
                        <input type="checkbox" name="completed" id={String(todo.id)} className="appearance-none h-4 w-4 p-2 rounded-full border-2 border-primary-mid bg-none hover:border-primary-dark hover:bg-primary-dark hover:bg-opacity-5 checked:bg-secondary-dark checked:border-secondary-dark disabled:bg-secondary-mid disabled:border-secondary-mid focus:outline-none transition duration-200 cursor-pointer"
                         onClick={() => completedTodo(todo.id)} defaultChecked={todo.completed} disabled={todo.completed} />

                        <p className={classnames("text-sm leading-[140%]", {
                          "text-gray-300 line-through": todo.completed,
                          "text-gray-100": !todo.completed,
                        })}>
                          {todo.text}
                        </p>

                        <button className="ml-auto p-2 hover:bg-gray-400 rounded transition-colors group" onClick={() => removeTodos(todo.id)}>
                          <TrashSimple className="text-gray-300 fill-gray-300 group-hover:text-danger group-hover:fill-danger transition-colors" />
                        </button>
                      </div>
                    )
                  }) }
                </>
              ) }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

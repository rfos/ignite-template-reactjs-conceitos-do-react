import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Se não tem titulo não faz nada... return vazio/nenhuma ação
    if (!newTaskTitle) {
      return;
    }
    // Gera um UUID (univoco para o ID)
    const RandomID = uuidv4();

    //Cria uma nova variável que recebe os dados do input
    const NewInputTask = {
      id: RandomID,
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks((oldState) => [...oldState, NewInputTask]);
  }

  function handleToggleTaskCompletion(id: number) {
    console.log(tasks);

    const ListTasks = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );

    setTasks(ListTasks);
  }

  function handleRemoveTask(id: number) {
    // filtrando listTask
    const filteredTasks = tasks.filter((task) => task.id !== id);
    // update state of listTask
    setTasks(filteredTasks);
  }

  console.log(tasks);
  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

import { useState, useEffect } from 'react'
import axios from 'axios'


import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList(props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  

  function handleCreateNewTask(e) {
    e.preventDefault()
   if (!newTaskTitle) return;
   const newTask = {
    id: Math.random(),
    title: newTaskTitle,
    isComplete: false
   }
   axios.post('http://localhost:3500/tasks', newTask)
    .then((response) => {
      props.handleCreateNewTask()
    })
   

   setTasks(odlState => [...odlState, newTask]);
   setNewTaskTitle("")

   
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => task.id === id ? {...task, isComplete:!task.isComplete} :task );
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredTask = tasks.filter(task => task.id !== id)
    setTasks(filteredTask)

  }

  return (
    <section className="task-list container">
      <header>
        <div>
        <h2>TO DO</h2>
        <button>
        <img src="icon-sun.svg" alt=""/>
        </button>
        </div>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
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

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
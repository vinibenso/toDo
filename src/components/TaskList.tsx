import { useState, useEffect } from 'react'
import axios from 'axios'


import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async() => {
      const result = await axios.get<Task[]>('http://localhost:3500/tasks')

      setTasks(result.data)
    }
    fetchTasks()
  }, [])

  async function handleCreateNewTask() {
   if(newTaskTitle.trim().length ===0) return;
   
   const newTask = {
    id:Math.random(),
    title: newTaskTitle,
    isComplete: false
   }
   
   const result = await axios.post('http://localhost:3500/tasks', newTask)

   setTasks(odlState => [...odlState, newTask]);
   setNewTaskTitle("")   
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => task.id === id ? {...task, isComplete:!task.isComplete} :task );
    setTasks(newTasks);
  }

   async function handleRemoveTask(id: number) {
     
    const result = await axios.delete(`http://localhost:3500/tasks/${id}`)
    setTasks(tasks.filter(task => task.id !== id))

  }

  const [dark, setDark] = useState(false)

  const theme = {
    backgroundColor: dark ? 'black' : "white", 
    color: dark ? "white" : 'black',
    
  }

  function changeTheme(){
    setDark(dark => !dark)
  }

  return (
    
    
    <div className="task-list container">
      <div>
      <header>
        <div>
        <h2>T O D O</h2>
        <button onClick={changeTheme} >
        <img src="icon-sun.svg" alt="change theme"/>
        </button>
        </div>

        <div className="input-group" >
          <input 
            style={theme}
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button 
          style={theme}
          type="button" 
          data-testid="add-task-button" 
          onClick={handleCreateNewTask}>
            <FiCheckSquare  size={16}  color='blue'/>
          </button>
        </div>
        
      </header>
      </div>
    
      <div className="listContainer"  style={theme}>
      <main>
        
        <ul>
          {tasks.map(task => (
            <li 
            key={task.id} 
            style={theme}>
              <div 
              className={task.isComplete ? 'completed' : ''}
              data-testid="task" >
                <label className="checkbox-container" >
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p style={theme}>{task.title}</p>
              </div>

              <button 
              type="button" 
              data-testid="remove-task-button" 
              onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      
      </main>
      </div>
    </div>
    
  )
}

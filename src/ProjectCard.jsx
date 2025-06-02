import { useState } from 'react'
import Form from './Form.jsx'
import Task from './Task.jsx';
import './App.css'

function ProjectCard({ projectTitle, removeProject, projects }) {

  const [tasks, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [projectRemoved, setProjectRemoved] = useState(false);

  function addTask(event) {
    const priorityValue = event.target.priority.value;
    
    const newTask = {
      id: Date.now(),
      text: taskInput,
      priority: priorityValue,
      completed: false
    }

    setTask([...tasks, newTask]);
    setTaskInput('');
  }

  function removeTask(taskID) {
    setTask(tasks => tasks.map(task => task.id === taskID ? {...task, completed: !task.completed} : task));

    setTimeout(() => {
    const updatedTasks = tasks.filter(task => (task.id !== taskID));
    setTask(updatedTasks);
    }, 1000);

  }

  function handleRemove() {
   setProjectRemoved(!projectRemoved);
  }

    return (
        <>
        <div className={`project ${projectRemoved === true ? 'remove' : ''}`} onTransitionEnd={() => {removeProject(projects.id)}}>
          <span><button className='remove-project-btn' onClick={handleRemove}>x</button></span>
          <h1>Project {projectTitle}</h1>
          <Form addTask={addTask} setTaskInput={setTaskInput} taskInput={taskInput} />
          <h2>Tasks:</h2><br />
          <Task tasks={tasks} removeTask={removeTask} />
        </div>
        </>
    )
}

export default ProjectCard
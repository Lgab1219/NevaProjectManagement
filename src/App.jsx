import { useState } from 'react'
import Form from './Form.jsx'
import Task from './Task.jsx';
import './App.css'

function App() {

  const [tasks, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState('');

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

  return (
    <>
      <Form addTask={addTask} setTaskInput={setTaskInput} taskInput={taskInput} />
      <p>Tasks:</p><br />
      <Task tasks={tasks} removeTask={removeTask} />
    </>
  )
}

export default App

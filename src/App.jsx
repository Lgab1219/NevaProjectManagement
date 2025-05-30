import { useState } from 'react'
import './App.css'

function Form({ addTask, setTaskInput, taskInput  }) {

  function handleAdd(event) {
    event.preventDefault();
    addTask();
  }

  return (
    <>
      <div className='task-container'>
        <form className='task-form'>
          <label htmlFor="task-input">Write your task below</label><br />
          <input type="text" name="taskInput" id='task-input' value={taskInput} onChange={(e) => { setTaskInput(e.target.value) }}/>
          <button type="submit" className='add-button' onClick={handleAdd}>Add Task</button>
        </form>
      </div>
    </>
  )
}

function App() {

  const [tasks, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskRemoved, setTaskRemoved] = useState(false);

  function addTask() {
    setTask([...tasks, taskInput]);
    setTaskInput('');
  }

  function removeTask(index) {
    const updatedTasks = tasks.filter((_, i) => (i !== index));
    setTask(updatedTasks);
  }

  return (
    <>
      <Form addTask={addTask} setTaskInput={setTaskInput} taskInput={taskInput} />
      <p>Tasks:</p><br />
      {tasks.map((task, index) => (
        <div className='task' key={index}>
          <h3>Task:</h3>
          <p>{task}</p>
          <input type="button" value="Completed" className='complete-btn' onClick={() => {removeTask(index)}} />
        </div>
      ))}
    </>
  )
}

export default App

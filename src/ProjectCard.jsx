import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Form from './Form.jsx'
import Task from './Task.jsx'
import supabase from './js/supabase.js'
import './css/App.css'


function ProjectCard({ projectID, removeProject, projectTitle }) {

  const [tasks, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [projectRemoved, setProjectRemoved] = useState(false);

  // Since fetching tasks is an async function, you need to await supabase in order to render data
  const fetchTasks = async () => {
    const {data, error} = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectID) // Fetch data based on the project's id

    if (error) {
      console.log("ERROR: ", error);
    } else {
      setTask(data);
    }
  }

  // Detect if there are changes
  useEffect(() => {
    fetchTasks();
  }, [])

  async function addTask(event) {
    const priorityValue = event.target.priority.value;

    // Insert data into database
    const { error } = await supabase
    .from('tasks')
    .insert({
      id: uuidv4(),
      text: taskInput,
      priority: priorityValue,
      completed: false,
      project_id: projectID
    })

    if (error) {
      console.log("ERROR: ", error);
    } else {
      fetchTasks();
    }
    
    /* const newTask = {
      id: Date.now(),
      text: taskInput,
      priority: priorityValue,
      completed: false
    } */

    //setTask([...tasks, newTask]);
    setTaskInput('');
  }

  async function removeTask(taskID) {
    const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskID)

    if (error) {
      console.log("ERROR: ", error);
    }

    setTask(tasks => tasks.map(task => task.id === taskID ? {...task, completed: !task.completed} : task));

    setTimeout(() => {
    const updatedTasks = tasks.filter(task => (task.id !== taskID));
    setTask(updatedTasks);
    }, 1000);

  }

  async function handleRemove(projectTitle) {

    // Delete tasks referenced from project_id
    await supabase
    .from('tasks')
    .delete()
    .eq('project_id', projectID)

    // Then delete project itself
    const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectTitle)

    if (error) {
      console.log("ERROR: ", error);
    }

   // Trigger animation
   setProjectRemoved(!projectRemoved);
   
   // Trigger timer for 900ms then remove state
   setTimeout(() => {
     removeProject(projectTitle);
   }, 500);
  }

    return (
        <>
        <div className={`project ${projectRemoved ? 'remove' : ''}`}>
          <span><button className='remove-project-btn' onClick={() => handleRemove(projectID)}>-</button></span>
          <h1>{projectTitle}</h1>
          <Form addTask={addTask} setTaskInput={setTaskInput} taskInput={taskInput} />
          <h2>Tasks:</h2><br />
          <Task tasks={tasks} removeTask={removeTask} />
        </div>
        </>
    )
}

export default ProjectCard
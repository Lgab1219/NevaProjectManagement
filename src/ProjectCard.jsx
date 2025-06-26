import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Form from './Form.jsx'
import Task from './Task.jsx'
import InvitePanel from './InvitePanel.jsx'
import supabase from './js/supabase.js'
import UserContext from './js/UserContext.js'
import './css/App.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


function ProjectCard({ projectID, removeProject, projectTitle }) {

  const [tasks, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [projectRemoved, setProjectRemoved] = useState(false);
  const [inviteUser, setInviteUser] = useState(false);

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

  function handleInvite() {
    setInviteUser(!inviteUser);
  }

  // Every time a user is invited, there will be a query that will be inserted into "chat_users" table (chat_id, user_id,
  // project_id) + also insert query current logged user to the table.
  
  // Then, the data from "chat_users" table will be fetched where the project_id (chat_users) is equal to projectID.


    return (
        <>
        <div className={`project ${projectRemoved ? 'remove' : ''}`}>
          <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target={`#projectMoreOptions-${projectID}`} aria-controls={`projectMoreOptions-${projectID}`} aria-expanded="false" aria-label="Toggle navigation">
            <span className='project-opt'>...</span>
          </button>
          <div className='collapse' id={`projectMoreOptions-${projectID}`}>
            <p className='invite' onClick={handleInvite}>Invite Users</p>
            <p className='create-chat'>Create Project Chat</p>
          </div>

          <span><button className='remove-project-btn' onClick={() => handleRemove(projectID)}>-</button></span>
          <h1>{projectTitle}</h1>
          <UserContext value={{ addTask, setTaskInput, taskInput, tasks, removeTask, inviteUser, projectID }}>
            <Form />
            <h2>Tasks:</h2><br />
            <Task />
            <InvitePanel />
          </UserContext>
        </div>

        </>
    )
}

export default ProjectCard
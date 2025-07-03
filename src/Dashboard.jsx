import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid'
import ProjectCard from './ProjectCard.jsx'
import supabase from './js/supabase.js'
import './css/App.css'
import './css/responsive.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [projectInput, setProjectInput] = useState('');
  const [projectPanel, toggleProjectPanel] = useState(false);
  const panelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user) {
        window.alert("Please login to access your dashboard!");
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data: all_data, error: all_error } = await supabase
    .from('projects')
    .select('*')
    .eq('created_by', user.id) // Fetch user data where created_by column is equal to current logged user.id

    if (all_error) {
      console.log("ERROR: ", all_error);
    }

    const { data: shared_data, error: shared_error } = await supabase
    .from('shared_projects')
    .select('project_id')
    .eq('shared_to', user.id)

    const sharedId = shared_data.map(project => project.project_id); // This variable is an array with multiple projectIDs

    const { data: shared_projects, error: sharedProjects_error } = await supabase
    .from('projects')
    .select('*')
    .in('id', sharedId) // Checks multiple project IDs at the same time unlike "eq" which checks 1 at a time

    if (shared_error || sharedProjects_error) {
      console.log("ERROR: ", shared_error || sharedProjects_error);
    }

    setProjects([...all_data, ...shared_projects]);
  }

  useEffect(() => {
    fetchProjects();
  }, [])

  async function addProject(event) {
      event.preventDefault();

      const project_title = projectInput;

      if (project_title === '') {
        window.alert("Fill in the input!");
        return;
      }
      // Fetch current user and place it in created_by column for each project created
      const { data: { user } } = await supabase.auth.getUser();

      const { data: newProjectData, error } = await supabase
      .from('projects')
      .insert({
        id: uuidv4(),
        title: projectInput,
        created_by: user.id
      })
      .select()

      // Select most recently created project
      const selectedProject = newProjectData[0];

      if (error) {
        console.log("ERROR: ", error);
      } else {
        await fetchProjects();
      }

      // Add currently logged user to chat_users table (for sidebar chat)
      const { error: chatUserError } = await supabase
      .from('chat_users')
      .insert({
        user_id: user.id,
        project_id: selectedProject.id,
        username: user.user_metadata.displayName
      })

      if (chatUserError) {
        console.log("ERROR: ", chatUserError);
        return;
      }

      toggleProjectPanel(!projectPanel);
  }

  function removeProject(projectID) {
    const updatedProjects = projects.filter(project => (project.id !== projectID));
    setProjects(updatedProjects);
  }

  function togglePanel() {
    if (projectPanel) {
      panelRef.current.classList.add('close');
      setTimeout(() => {
        toggleProjectPanel(!projectPanel);
      }, 1000)
    } else {
      toggleProjectPanel(!projectPanel);
    }
  }

  return (
    <>

    <div id='btn-container'>
      <button type="submit" className='open-panel-btn' onClick={togglePanel}>+</button>
    </div>

    {
      projectPanel ? (
    <div className='panel-container' ref={panelRef}>
      <section className='panel'>
        <form className='panel-form' onSubmit={addProject}>
          <label htmlFor="title-input">Project Title</label><br />
          <input type="text" name="titleInput" id="title-input" onChange={(e) => {setProjectInput(e.target.value)}} />
          
          <br /><br />

          <button type="submit" className='add-project-btn'>Create Project</button>
        </form>
      </section>
    </div>
    ) : null
    }

    <div id='project-container'>
      {projects.map(project => (
        <ProjectCard key={project.id} removeProject={removeProject} projectID={project.id} projectTitle={project.title} />
      ))}
    </div>
    </>
  )
}

export default Dashboard

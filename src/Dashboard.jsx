import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid'
import ProjectCard from './ProjectCard.jsx'
import supabase from './js/supabase.js'
import './css/App.css'

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

  async function logOut(event) {
    event.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("ERROR: ", error);
      return;
    }

    navigate('/');
  }

  const fetchProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('created_by', user.id) // Fetch user data where created_by column is equal to current logged user.id

    if (error) {
      console.log("ERROR: ", error);
    } else {
      setProjects(data);
    }
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

      const { error } = await supabase
      .from('projects')
      .insert({
        id: uuidv4(),
        title: projectInput,
        created_by: user.id
      })

      if (error) {
        console.log("ERROR: ", error);
      } else {
        await fetchProjects();
      }

      /*const newProject = {
        id: Date.now(),
        title: projectInput
      }*/

      toggleProjectPanel(!projectPanel);
      //setProjects([...projects, newProject]);
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
      <a href="" onClick={logOut}>Logout</a>
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

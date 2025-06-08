import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import ProjectCard from './ProjectCard.jsx'
import supabase from './js/supabase.js'
import './css/App.css'

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [projectInput, setProjectInput] = useState('');
  const [projectPanel, toggleProjectPanel] = useState(false);
  const panelRef = useRef(null);
  const navigate = useNavigate();

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
    const { data, error } = await supabase
    .from('projects')
    .select('*')

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

      const { error } = await supabase
      .from('projects')
      .insert({
        id: Date.now(),
        title: project_title
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

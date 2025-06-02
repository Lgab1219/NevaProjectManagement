import { useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import './App.css'

function App() {

  const [projects, setProjects] = useState([]);

  function addProject(event) {
    event.preventDefault();

    const newProject = {
      id: Date.now()
    }

    setProjects([...projects, newProject]);
}

function removeProject(projectID) {
  const updatedProjects = projects.filter(project => (project.id !== projectID));
  setProjects(updatedProjects);

  setTimeout(() => {
    setProjects(updatedProjects);
  }, 1000)
}

  return (
    <>
    <div id='btn-container'>
      <button type="submit" className='add-project-btn' onClick={addProject}>+</button>
    </div>
    <div id='project-container'>
      {projects.map(project => (
        <ProjectCard key={project.id} removeProject={removeProject} projectTitle={project.id} projects={projects} />
      ))}
    </div>
    </>
  )
}

export default App

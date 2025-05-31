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

  return (
    <>
    <div id='btn-container'>
      <button type="submit" className='add-project-btn' onClick={addProject}>+</button>
    </div>
    <div id='project-container'>
      {projects.map(project => (
        <ProjectCard key={project.id} projectTitle={project.id} />
      ))}
    </div>
    </>
  )
}

export default App

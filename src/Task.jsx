import UserContext from './js/UserContext'
import { useContext } from 'react'
import './css/App.css'

function Task() {

    const context = useContext(UserContext);

    return (
        <>
            {context.tasks.map(task => (
                <div className={`task ${task.completed ? 'remove' : ''}`} key={task.id}>
                  <h3>{task.text}</h3>
                  <p>Priority: {task.priority}</p>
                  <input type="button" value="Completed" className='complete-btn' onClick={() => {context.removeTask(task.id)}} />
                </div>
            ))}
        </>
    )
}

export default Task
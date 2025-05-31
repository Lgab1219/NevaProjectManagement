import './App.css'

function Task({ tasks, removeTask }) {

    return (
        <>
            {tasks.map(task => (
                <div className={`task ${task.completed ? 'remove' : ''}`} key={task.id}>
                  <h3>Task:</h3>
                  <p>{task.text}</p>
                  <p>Priority: {task.priority}</p>
                  <input type="button" value="Completed" className='complete-btn' onClick={() => {removeTask(task.id)}} />
                </div>
            ))}
        </>
    )
}

export default Task
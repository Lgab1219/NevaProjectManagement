import UserContext from './js/UserContext';
import { useContext } from 'react';
import './css/App.css'

function Form() {

  const context = useContext(UserContext);

    function handleAdd(event) {
    event.preventDefault();
    context.addTask(event);
    }

    return (
    <>
      <div className='task-container'>
        <form className='task-form' onSubmit={handleAdd}>
          <label htmlFor="task-input">Write your task below</label><br />
          <input type="text" name="taskInput" id='task-input' value={context.taskInput} onChange={(e) => { context.setTaskInput(e.target.value) }}/><br />
          <label htmlFor="priority">Priority: </label>
          <select name="priority" id="priority">
            <option value="urgent">Urgent</option>
            <option value="required">Required</option>
            <option value="unimportant">Unimportant</option>
          </select><br /><br />
          <button type="submit" className='add-btn'>Add Task</button>
        </form>
      </div>
    </>
    )
}

export default Form
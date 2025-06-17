import { useEffect, useState } from 'react'
import './css/App.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

function invitePanel({ inviteUser }) {

    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState('');

    const searchUsers = async (input) => {
        const result = await fetch(`http://localhost:4000/search-users?query=${input}`);

        const usersJSON = await result.json();

        setUsers(usersJSON);
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            if (userInput !== '') {
                searchUsers(userInput);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [userInput]);



    return (
        <>
        <div className={`inv-panel-container ${inviteUser ? '' : 'close'}`}>
          <section className='inv-panel'>
            <form className='inv-panel-form'>
              <label htmlFor="inv-input">Project Title</label><br />
              <input type="text" name="invInput" id="inv-input" onChange={(e) => {setUserInput(e.target.value)}} />
              <button type="submit" className='inv-btn'>Invite User</button>
            </form>
            { users.map(user => (
                    <p key={user.id}>{user.user_metadata.displayName}</p>
            )) }
          </section>
        </div>        
        </>
    )
}

export default invitePanel
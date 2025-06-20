import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import UserContext from './js/UserContext.js'
import './css/App.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import supabase from './js/supabase.js';

function invitePanel() {

    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState('');
    const context = useContext(UserContext);

    const searchUsers = async (input) => {
        const result = await fetch(`http://localhost:4000/search-users?query=${input}`);

        const usersJSON = await result.json();

        setUsers(usersJSON);
    }

    const handleInviteUsers = async (user) => {

      const { error } = await supabase
      .from('shared_projects')
      .insert({
        id: uuidv4(),
        project_id: context.projectID,
        user_id: user.id
      })

      if (error) {
        console.log("ERROR: ", error);
      } else {
        window.alert(user.user_metadata.displayName + "  is invited to your project!");
      }

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
        <div className={`inv-panel-container ${context.inviteUser ? '' : 'close'}`}>
          <section className='inv-panel'>
            <form className='inv-panel-form'>
              <label htmlFor="inv-input">Search for users to collaborate with:</label><br />
              <input type="text" name="invInput" id="inv-input" onChange={(e) => {setUserInput(e.target.value)}} />
            </form>
            { users.map(user => (
                    <p onClick={() => { handleInviteUsers(user) }} key={user.id}>{user.user_metadata.displayName}</p>
            )) }
          </section>
        </div>        
        </>
    )
}

export default invitePanel
import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { dashboardStore } from './js/useStores'
import UserContext from './js/UserContext.js'
import './css/App.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import supabase from './js/supabase.js';

function invitePanel() {

    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState('');
    const context = useContext(UserContext);
    const setProjectID = dashboardStore((state) => state.setProjectID);

    const searchUsers = async (input) => {
        const result = await fetch(`http://localhost:4000/search-users?query=${input}`);

        const usersJSON = await result.json();

        setUsers(usersJSON);
    }

    // Deletes listed user once user is invited to the project
    const deleteUsername = (userID) => {
      const updatedUsers = users.filter(user => (user.id !== userID));
      setUsers(updatedUsers);
    }

    const handleInviteUsers = async (user) => {

      const { error } = await supabase
      .from('shared_projects')
      .insert({
        id: uuidv4(),
        project_id: context.projectID,
        shared_to: user.id
      })

      if (error) {
        console.log("ERROR: ", error);
      } else {
        window.alert(user.user_metadata.displayName + "  is invited to your project!");
        deleteUsername(user.id);
      }

      // Add invited users to chat_users table (for sidebar chat)
      const { error: chatUserError } = await supabase
      .from('chat_users')
      .insert({
        user_id: user.id,
        project_id: context.projectID
      })

      if (chatUserError) {
        console.log("ERROR: ", chatUserError);
        return;
      }

      setProjectID(context.projectID);

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
                    <p className='invite-users' onClick={() => { handleInviteUsers(user) }} key={user.id}>{user.user_metadata.displayName}</p>
            )) }
          </section>
        </div>        
        </>
    )
}

export default invitePanel
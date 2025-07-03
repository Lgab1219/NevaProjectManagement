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
    const setUsername = dashboardStore((state) => state.setUsername);
    const storeChatUsers = dashboardStore((state) => state.storeChatUsers);

    const searchUsers = async (input) => {
        const {data: userData, error: userError} = await supabase.auth.getUser();

        const result = await fetch(`http://localhost:4000/search-users?query=${input}`);

        const usersJSON = await result.json();

        const filteredUsers = usersJSON.filter(user => user.user_metadata.displayName !== userData.user.user_metadata.displayName
          && !storeChatUsers.some(cu => cu.user_id === user.id)
        );

        setUsers(filteredUsers);
    }

    // Deletes listed user once user is invited to the project
    const deleteUsername = (userID) => {
      const updatedUsers = users.filter(user => (user.id !== userID));
      // ERROR: Invited users does not get filtered out in InvitePanel
      setUsers(updatedUsers);
    }

    const handleInviteUsers = async (user) => {

      // Add users to shared_projects table (to share the project with other users)
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
        project_id: context.projectID,
        username: user.user_metadata.displayName
      })

      if (chatUserError) {
        console.log("ERROR: ", chatUserError);
        return;
      }

      setUsername(user.id, user.user_metadata.displayName);

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
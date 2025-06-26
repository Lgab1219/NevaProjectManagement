import { useState, useEffect, useContext } from 'react'
import supabase from './js/supabase'
import UserContext from './js/UserContext'
import './css/App.css'

function Sidebar() {

    const context = useContext(UserContext);
    const [chatUsers, setChatUsers] = useState([]);

    useEffect(() => {

        const fetchChatUsers = async () => {

            const { data, error } = await supabase
            .from('chat_users')
            .select('*')
            .eq('project_id', context.projectID)

            if (error) {
                console.log("ERROR: ", error);
                return;
            }

            setChatUsers(data);
            console.log("USERS: ", chatUsers);
        }

        fetchChatUsers();

    }, [context.inviteUser])

    return (
        <>
            <div className='sidebar px-2'>
                <form>
                    <label htmlFor="searchChatUser" className='text-white mt-5 mb-2'>Send Messages</label>
                    <input type="text" name="search-chat-user" id="searchChatUser" />
                </form>
            </div>
        </>
    )
}

export default Sidebar
import { useState, useEffect } from 'react'
import supabase from './js/supabase'
import { dashboardStore } from './js/useStores'
import './css/App.css'

function Sidebar() {

    const [chatUsers, setChatUsers] = useState([]);
    const projectID = dashboardStore((state) => state.projectID);

    useEffect(() => {

        if (!projectID) {
            return;
        }

        const fetchChatUsers = async () => {

            const { data: chatUsersData, error: chatUsersError } = await supabase
            .from('chat_users')
            .select('*')
            .eq('project_id', projectID)

            if (chatUsersError) {
                console.log("ERROR: ", chatUsersError);
                return;
            }

            // Cannot store specific chat user data yet.
            // I would have to setup a seperate profiles table, then insert all usernames there after registration
            

        }

        fetchChatUsers();

    }, [projectID]);

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
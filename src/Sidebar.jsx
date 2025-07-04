import { useState, useEffect } from 'react'
import supabase from './js/supabase'
import { dashboardStore } from './js/useStores';
import './css/App.css'

function Sidebar() {

    const [chatUsers, setChatUsers] = useState([]);
    const storeSetChatUsers = dashboardStore((state) => state.storeSetChatUsers);

    useEffect(() => {

        const fetchChatUsers = async () => {

            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                return;
            }

            const { data: profilesData, error: profilesError } = await supabase
            .from('chat_users')
            .select(`
                    user_id,
                    username
                `)

            // BUG: Shows duplicate usernames even though they have different project ids.

            if (profilesError) {
                console.log("ERROR: ", profilesError);
                return;
            }

            const filteredChatUsers = profilesData.filter(users => users.username !== user.user_metadata?.displayName);

            setChatUsers(filteredChatUsers);

            storeSetChatUsers(profilesData);
        }

        fetchChatUsers();

    }, [chatUsers]);

    return (
        <>
            <div className='sidebar px-2'>
                <form>
                    <label htmlFor="searchChatUser" className='text-white mt-5 mb-2'>Send Messages</label>
                    <input type="text" name="search-chat-user" id="searchChatUser" />
                    {
                        chatUsers.map(user => (
                            <p key={user.user_id} className='text-white'>
                                {user.username}
                            </p>
                        ))
                    }
                </form>
            </div>
        </>
    )
}

export default Sidebar
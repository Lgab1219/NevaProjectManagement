import './css/App.css'

function Sidebar() {

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
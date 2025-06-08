import { useContext } from "react"
import UserContext from "./js/UserContext"

function Register() {

    const context = useContext(UserContext);

    return (
        <>
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={context.registerAccount}>
                <label htmlFor="user-input">Username</label><br />
                <input type="text" name="username" id="user-input" onChange={(e) => {context.setUserInput(e.target.value)}} /><br /><br />
                <label htmlFor="email-input">Email</label><br />
                <input type="text" name="email" id="email-input" onChange={(e) => {context.setEmailInput(e.target.value)}} /><br /><br />
                <label htmlFor="password-input">Password</label><br />
                <input type="text" name="password" id="password-input" onChange={(e) => {context.setPasswordInput(e.target.value)}} /><br /><br />
                <button type="submit">Register</button>
            </form>
        </div>
        </>
    )
}

export default Register
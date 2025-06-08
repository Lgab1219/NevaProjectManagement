import { useContext } from "react"
import UserContext from "./js/UserContext.js"

function Login() {

    const context = useContext(UserContext);

    return (
        <>
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={context.loginAccount}>
                    <label htmlFor="email-input">Email</label><br />
                    <input type="text" name="email" id="email-input" onChange={(e) => {context.setEmailInput(e.target.value)}} /><br /><br />

                    <label htmlFor="password-input">Password</label><br />
                    <input type="text" name="password" id="password-input" onChange={(e) => {context.setPasswordInput(e.target.value)}} /><br /><br />

                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
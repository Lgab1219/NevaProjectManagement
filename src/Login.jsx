import { useContext } from "react"
import UserContext from "./js/UserContext.js"

function Login() {

    const context = useContext(UserContext);

    return (
        <>
        <div>
            <div className="login-bgtext">
                LOGIN
            </div>

           <div className="cover">

           </div>

            <main className="login-container d-block text-center rounded-4 inter z-1">
                <span>
                    <img src="../resources/NEVA_Logo.png" className="logo" alt="logo" />
                </span>
                <form className="login-form" onSubmit={context.loginAccount}>
                    <div className="form-group">
                        <label htmlFor="email-input">Email</label><br />
                        <input type="text" name="email" id="email-input" onChange={(e) => {context.setEmailInput(e.target.value)}} /><br /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password-input">Password</label><br />
                        <input type="text" name="password" id="password-input" onChange={(e) => {context.setPasswordInput(e.target.value)}} /><br /><br />
                    </div>

                    <button className="login-btn my-3 rounded-5 inter" type="submit">Login</button>
                    <p>Want an account? <a href="" onClick={context.loginRegisterToggle}>Register</a> here!</p>
                </form>
            </main>
        </div>
        </>
    )
}

export default Login
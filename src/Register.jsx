import { useContext } from "react"
import UserContext from "./js/UserContext"

function Register() {

    const context = useContext(UserContext);

    return (
        <>
        <div>
            <div className="cover-reverse">

            </div>

           <div className="register-bgtext">
            REGISTER
           </div>

            <main className="register-container d-block text-center rounded-4 inter z-1">
                <span>
                    <img src="../resources/NEVA_Logo.png" className="logo" alt="logo" />
                </span>
                <form onSubmit={context.registerAccount}>
                    <div className="form-group">
                        <label htmlFor="user-input">Username</label><br />
                        <input type="text" name="username" id="user-input" onChange={(e) => {context.setUserInput(e.target.value)}} /><br /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email-input">Email</label><br />
                        <input type="text" name="email" id="email-input" onChange={(e) => {context.setEmailInput(e.target.value)}} /><br /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password-input">Password</label><br />
                        <input type="text" name="password" id="password-input" onChange={(e) => {context.setPasswordInput(e.target.value)}} /><br /><br />
                    </div>

                    <button className="login-btn my-3 rounded-3 inter" type="submit">Register</button>
                    <p>Already have an account? <a href="" onClick={context.loginRegisterToggle}>Login</a> here!</p>
                </form>
            </main>
        </div>
        </>
    )
}

export default Register
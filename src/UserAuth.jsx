// import { Link } from "react-router-dom"
import { useState } from "react"
import supabase from "./js/supabase";

function UserAuth() {

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [userInput, setUserInput] = useState('');

    async function registerAccount(event) {
        event.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email: emailInput,
            password: passwordInput,
            options: {
                data: {
                    displayName: userInput
                }
            }
        })

        if (error) {
            console.log("ERROR: ", error);
        } else {
            window.alert("You have successfully registered! Please check your email to confirm your registration.");
        }
    }

    return (
        <>
            <div>
                <h1>Register</h1>
                <form onSubmit={registerAccount}>
                    <label htmlFor="user-input">Username</label><br />
                    <input type="text" name="username" id="user-input" onChange={(e) => {setUserInput(e.target.value)}} /><br /><br />

                    <label htmlFor="email-input">Email</label><br />
                    <input type="text" name="email" id="email-input" onChange={(e) => {setEmailInput(e.target.value)}} /><br /><br />

                    <label htmlFor="password-input">Password</label><br />
                    <input type="text" name="password" id="password-input" onChange={(e) => {setPasswordInput(e.target.value)}} /><br /><br />

                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default UserAuth
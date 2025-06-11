import { Link } from "react-router-dom"
import Register from "./Register.jsx"
import Login from "./Login.jsx"
import { useNavigate } from "react-router"
import { useState } from "react"
import UserContext from "./js/UserContext.js"
import supabase from "./js/supabase"

function UserAuth() {

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    function loginRegisterToggle(event) {
        event.preventDefault();

        setIsLogin(!isLogin);
    }

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

    async function loginAccount(event) {
        event.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailInput,
            password: passwordInput
        })

        if (error) {
            window.alert("Invalid email or password!");
            console.log("ERROR: ", error);
            return;
        }

        if (data && data.user) {
            navigate('/dashboard');
        }
    }

    return (
        <>
            <UserContext value={{ isLogin, loginRegisterToggle, setUserInput, setEmailInput, setPasswordInput, registerAccount, loginAccount }}>
                {isLogin ? <Login /> : <Register />}
            </UserContext>
        </>
    )
}

export default UserAuth
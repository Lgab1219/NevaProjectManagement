import Navbar from "./Navbar"
import Dashboard from "./Dashboard"
import Sidebar from "./Sidebar";
import supabase from "./js/supabase"
import UserContext from "./js/UserContext";
import { useNavigate } from "react-router";

function Homepage() {

    const navigate = useNavigate();

    async function logOut(event) {
      event.preventDefault();   
      const { error } = await supabase.auth.signOut();  

      if (error) {
        console.log("ERROR: ", error);
        return;
      } 
      
      navigate('/');
    }

    return (
        <>
            <UserContext value={{ logOut }}>

                <div className="d-flex flex-row">
                    <section>
                        <Sidebar />
                    </section>

                    <main className="d-flex flex-column">
                        <Navbar />
                        <Dashboard />
                    </main>
                </div>


            </UserContext>
        </>
    )
}

export default Homepage
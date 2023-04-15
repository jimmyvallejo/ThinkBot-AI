import { useState, useContext, } from "react";
import { Link } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Button from "./Buttton";
import { colors } from "../styles/colors";
import { useLocation } from "react-router-dom";






const Navbar = () => {
  const { user } = useContext(AuthContext);

  const location = useLocation();
  
  const {setShowChat, setSubject, role} = useContext(ChatContext)

  const handleSignout = () => signOut(getAuth());



    const clearStorage = () =>{
        console.log("hi")
    }

    
    const [loggedIn, setLoggedIn] = useState(true)

    const handleChange = () => {
      setShowChat(null);
       setSubject(null);
       
    
      };

  return (
    <nav>
     <div className="navstart">
      <Link className="navName" to={"/"}>
        <img className="Robot" src="./Robot.png"></img>
        <h3>AI Tutor</h3>
      </Link>
            {location.pathname === "/tutor" &&<Button style={{background: colors.whites[500], color: colors.blues[500], fontSize: "20px", marginTop:"40px"}} onClick={() => handleChange()}> + New Chat</Button>}
            </div>
      <div className="navdiv">
        {role === "student" && (
          <Link className="navItem" to={"/tutor"}>
            Tutor
          </Link>
        )}
        {role === "teacher" && (
          <Link className="navItem" to={"/dashboard"}>
            Dashboard
          </Link>
        )}
        {!user && (
          <Link className="navItem" to={"/login"}>
            Login
          </Link>
        )}
        {!user && (
          <Link className="navItem" to={"/register"}>
            Signup
          </Link>
        )}
        {user && (
          <Link className="navItem" onClick={handleSignout}>
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

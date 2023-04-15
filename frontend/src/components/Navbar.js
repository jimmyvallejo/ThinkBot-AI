import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const handleSignout = () => signOut(getAuth());

  const [role, setRole] = useState("teacher");

  return (
    <nav>
      <Link className="navName" to={"/"}>
        <img className="Robot" src="./Robot.png"></img>
        <h3>AI Tutor</h3>
      </Link>

      <div>
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

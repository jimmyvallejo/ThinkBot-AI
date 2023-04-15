import { Link } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useState } from "react";

const Navbar = () => {
  const handleSignout = () => signOut(getAuth());

  const [role, setRole] = useState("teacher");
  const [loggedIn, setLoggedIn] = useState(true);

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
        <Link className="navItem" to={"/login"}>
          Login
        </Link>
        <Link className="navItem" to={"/register"}>
          Signup
        </Link>
        {loggedIn && (
          <Link className="navItem" onClick={handleSignout}>
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

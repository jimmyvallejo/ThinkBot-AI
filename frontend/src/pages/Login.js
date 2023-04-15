import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import swal from "sweetalert";
// import { AuthContext } from '../context/AuthContext';
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ history }) {
  const [formData, setFormData] = useState(null);
  // const { setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label id="email">Email </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div id="passlabel">
          <label className="passwordLabel">Password </label>
          <input
            className="passwordInput"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {error && <p>Error: {error}</p>}
        <div>
          <button className="loginBtn" type="submit">
            Login
          </button>
        </div>
      </form>
      <div>
        <p>New Here</p>
        <Link to="/Register">Click here to make an account</Link>
      </div>
    </div>
  );
}

export default Login;

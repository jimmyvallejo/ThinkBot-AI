import { useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import swal from "sweetalert";
// import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

function Student({ history }) {
  const [formData, setFormData] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const [error, setError] = useState(null);

  const age_options = [5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18];

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      if (userCredential.user) {
        await axios.post(
          "http://127.0.0.1:5001/miami-hackathon-ai/us-central1/api/user",
          {
            username,
            email,
            password,
            age,
            uid: userCredential.user.uid,
            role: "student",
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="login">
      <h1>Student Registration</h1>
      <form onSubmit={handleRegister}>
        <label id="email">Email </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label id="email">Username </label>
        <input
          type="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>
          How Old are You?:
          <select
            value={null}
            onChange={(e) => setAge(parseInt(e.target.value))}
          >
            <option value="">How old are you?</option>
            {age_options.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </label>
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
            Register
          </button>
        </div>
      </form>
      <div>
        <p>New Here</p>
        <Link to="/register">Click here to make an account</Link>
      </div>
    </div>
  );
}

export default Student;

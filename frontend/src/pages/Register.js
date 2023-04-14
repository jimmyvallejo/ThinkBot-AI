import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      console.log(userCredential.user);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <h1>Register</h1>

      <form action="">
        Email
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="text"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Register;

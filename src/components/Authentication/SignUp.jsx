import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import NavBar from "../NavBar";

function SignUp({ appWriteAccount }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpWithEmail = async (email, password, name) => {
    try {
      const response = await appWriteAccount.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error); // Failure
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpWithEmail(email, password, name);
  };

  return (
    <div style={{ margin: "auto 0" }}>
      <NavBar />
      <form className="flex-col form" onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

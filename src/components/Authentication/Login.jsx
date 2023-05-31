import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../hooks/context";

const Login = ({ appWriteAccount }) => {
  const { session, setSession } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = async (email, password) => {
    try {
      const response = await appWriteAccount.createEmailSession(
        email,
        password
      );
      setSession(response);
      navigate("/tasks/incomplete");
    } catch (error) {
      console.log(error); // Failure
    }
  };

  useEffect(() => {
    console.log("context session", session);
  }, [session]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithEmail(email, password);
  };

  return (
    <div style={{ margin: "auto 0" }}>
      <form className="flex-col form" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

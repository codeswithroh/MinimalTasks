import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../hooks/context";
import toast from "react-hot-toast";

const Login = ({ appWriteAccount }) => {
  const { setSession } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginWithEmail = async (email, password) => {
    try {
      const toastLoading = toast.loading("Loading...");
      setLoading(true);
      const response = await appWriteAccount.createEmailSession(
        email,
        password
      );

      toast.dismiss(toastLoading);
      if (!!response) {
        toast.success("Logged in successfully");
      } else {
        toast.error("Something went wrong");
      }
      setSession(response);
      setLoading(false);
      navigate("/tasks/incomplete");
    } catch (error) {
      toast.error(error);
    }
  };

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
        <button disabled={loading} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

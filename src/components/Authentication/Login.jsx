import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../hooks/context";
import { Card, CardContent, Typography } from "@mui/material";
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
    <Card sx={{ margin: "5em 0" }}>
      <CardContent>
        <Typography variant="h4" component="div">
          Login
        </Typography>
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

        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/signup")}
          variant="body2"
          color="text.secondary"
        >
          Don't have an account yet? Signup
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Login;

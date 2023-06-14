import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import toast from "react-hot-toast";

function SignUp({ appWriteAccount }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async (email, password, name) => {
    try {
      const toastLoading = toast.loading("Loading...");
      setLoading(true);

      const response = await appWriteAccount.create(
        ID.unique(),
        email,
        password,
        name
      );

      toast.dismiss(toastLoading);
      if (!!response) {
        toast.success("Logged in successfully");
      } else {
        toast.error("Something went wrong");
      }

      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpWithEmail(email, password, name);
  };

  return (
    <Card sx={{ margin: "5em 0" }}>
      <CardContent>
        <Typography variant="h4" component="div">
          Signup
        </Typography>

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
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/login")}
          variant="body2"
          color="text.secondary"
        >
          Already have an account yet? Login
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SignUp;

import React, { useState } from "react";
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
    <div style={{ margin: "auto 0" }}>
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
    </div>
  );
}

export default SignUp;

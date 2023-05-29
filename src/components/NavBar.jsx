import React from "react";
import { useSession } from "../hooks/context";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { session, setSession } = useSession();
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem("session");
    navigate("/login");
  };

  return (
    <div className="nav flex-row">
      <div className="text-2">MinimalTasks</div>
      {!session && (
        <div className="flex-row" style={{ marginLeft: "auto" }}>
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {session && (
        <div style={{ marginLeft: "auto" }}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default NavBar;

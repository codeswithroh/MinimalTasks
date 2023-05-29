import React from "react";
import { useSession } from "../hooks/context";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { setSession } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem("session");
    navigate("/login");
  };
  return (
    <div className="nav flex-row">
      <div className="text-2">MinimalTasks</div>
      <div style={{ marginLeft: "auto" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default NavBar;

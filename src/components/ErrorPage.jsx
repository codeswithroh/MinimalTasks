import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "auto 0" }}>
      <h1>404 Page Not Found</h1>
      <p>Oops looks like you have visited a wrong page</p>
      <button onClick={() => navigate("/tasks/incomplete")}>
        Go To Home Page
      </button>
    </div>
  );
}

export default ErrorPage;

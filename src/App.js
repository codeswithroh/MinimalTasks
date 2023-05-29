import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import "./assets/styles/form.style.css";
import "./assets/styles/layout.style.css";
import "./assets/styles/font.style.css";
import "./assets/styles/component.style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Client, Account } from "appwrite";
import { useNavigate } from "react-router-dom";
import { SessionProvider, useSession } from "./hooks/context";

const Tasks = lazy(() => import("./components/Tasks/index"));
const SignUp = lazy(() => import("./components/Authentication/SignUp"));
const Login = lazy(() => import("./components/Authentication/Login"));

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646fac4383abdf7894e9");

const appWriteAccount = new Account(client);

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  return children;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: <SignUp appWriteAccount={appWriteAccount} />,
    },
    {
      path: "/login",
      exact: true,
      element: <Login appWriteAccount={appWriteAccount} />,
    },
  ]);

  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="App">
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </div>
    </Suspense>
  );
}

export default App;

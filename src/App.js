import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import "./assets/styles/form.style.css";
import "./assets/styles/layout.style.css";
import "./assets/styles/font.style.css";
import "./assets/styles/component.style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Client, Account } from "appwrite";
import { useNavigate, Navigate } from "react-router-dom";
import { SessionProvider, useSession } from "./hooks/context";
import { Toaster } from "react-hot-toast";
import CustomLoader from "./utils/custom/CustomLoader";

const ErrorPage = lazy(() => import("./components/ErrorPage"));
const NavBar = lazy(() => import("./components/NavBar"));
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
      element: <Navigate to="/tasks/incomplete" />,
    },
    {
      path: "/tasks/:type",
      exact: true,
      element: (
        <ProtectedRoute>
          <NavBar>
            <Tasks />
          </NavBar>
        </ProtectedRoute>
      ),
    },
    {
      path: "/tasks/category/:category",
      exact: true,
      element: (
        <ProtectedRoute>
          <NavBar>
            <Tasks />
          </NavBar>
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <NavBar>
          <SignUp appWriteAccount={appWriteAccount} />
        </NavBar>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: (
        <NavBar>
          <Login appWriteAccount={appWriteAccount} />
        </NavBar>
      ),
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <Suspense fallback={<CustomLoader />}>
      <div className="App">
        <Toaster
          position="bottom-right"
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              duration: 3000,
              theme: {
                primary: "red",
                secondary: "black",
              },
            },
          }}
        />
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </div>
    </Suspense>
  );
}

export default App;

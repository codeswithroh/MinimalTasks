import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context to store the session object
const SessionContext = createContext();

// Create a provider component to provide the session object to child components
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("session"))
  );

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

// Create a custom hook to access the session object from child components
export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};

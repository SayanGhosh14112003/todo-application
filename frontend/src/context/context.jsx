import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || null
  );
  console.log(JSON.parse(localStorage.getItem("auth"))?.token);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

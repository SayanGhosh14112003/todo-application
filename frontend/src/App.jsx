import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import NotFound from "./pages/NotFound";
import ProtectNotLogin from "./protectedRoutes/protectedRoute";
import ProtectLogin from "./protectedRoutes/ProtectedLoginRoute";
import AuthProvider from "./context/context";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ProtectNotLogin />}>
              <Route path="" element={<Todos />} />
            </Route>
            <Route path="/" element={<ProtectLogin />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

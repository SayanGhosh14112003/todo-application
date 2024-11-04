import { useState } from "react";
import "../App.css";
import { useAuth } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function loginForm(e) {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:8000/api/v1/user/login", {
        email,
        password,
      });
      console.log(user?.data);
      if (user?.statusText != "OK" || !user?.data?.success)
        throw new Error("Something went wrong");
      setAuth(user?.data?.data);
      localStorage.setItem("auth", JSON.stringify(user?.data?.data));
      console.log("Success");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <h1>Login Form</h1>
      <form onSubmit={loginForm}>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          required={true}
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          required={true}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <Link to="/register">Haven't registered</Link>
    </>
  );
}

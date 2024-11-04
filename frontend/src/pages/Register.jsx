import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function registerForm(e) {
    e.preventDefault();
    try {
      const user = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        {
          userName,
          email,
          password,
        }
      );
      if (user?.statusText != "OK" || !user?.data?.success)
        throw new Error("Something went wrong");
      console.log("Success");
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <h1>Register Form</h1>
      <form onSubmit={registerForm}>
        <input
          value={userName}
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your Name"
          required={true}
        />
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
      <Link to="/login">Already registered</Link>
    </>
  );
}

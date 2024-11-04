import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useAuth } from "../context/context";
export default function Todos() {
  const [auth, setAuth] = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  useEffect(() => {
    (async function getTodos() {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/todo/getTodos",
          {
            headers: {
              authorization:
                "Bearer " + JSON.parse(localStorage.getItem("auth"))?.token,
            },
          }
        );
        if (res?.statusText != "OK" || !res?.data?.success)
          throw new Error("Something went wrong");
        setTodos(res?.data?.data);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);
  async function todoForm(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo/addTodo",
        { title, description },
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("auth"))?.token,
          },
        }
      );
      console.log(res.data);
      setTodos([res?.data?.data, ...todos]);
      console.log("success");
    } catch (err) {}
  }
  async function deleteTodo(_id) {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/todo/deleteTodo/${_id}`,
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("auth"))?.token,
          },
        }
      );
      console.log(res.data);
      setTodos(todos?.filter((todo) => todo._id != _id));
      console.log("success");
    } catch (err) {
      console.log(err.message);
    }
  }
  async function markTodo(_id) {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/todo/markTodo/",
        { _id },
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("auth"))?.token,
          },
        }
      );
      console.log(res.data);
      setTodos(
        todos?.map((todo) => (todo._id == _id ? res?.data?.data : todo))
      );
      console.log("success");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <form onSubmit={todoForm}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
          placeholder="Enter Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDecription(e.target.value)}
          placeholder="Enter Description"
        />
        <br />
        <br />
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            setAuth(null);
          }}>
          logout
        </button>
      </form>
      {todos?.map((todo, i) => (
        <div key={todo._id} style={{ border: "2px solid black" }}>
          <h3>{todo.title}</h3>
          <h3>{todo.description}</h3>
          <h3>{todo.status ? "done" : "not done"}</h3>
          <input
            type="checkbox"
            checked={todo.status}
            onChange={() => markTodo(todo._id)}
          />{" "}
          <h3>{todo.status ? "Mark as not done" : "Mark as done"}</h3>
          <button onClick={() => deleteTodo(todo._id)}>Remove</button>
        </div>
      ))}
    </>
  );
}

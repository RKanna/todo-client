import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TodoState } from "./TodoContext";
import axios from "axios";

function App() {
  const [openAddTodoOverlay, setOpenAddTodoOverlay] = useState(false);
  const [openUpdateTodoOverlay, setOpenUpdateTodoOverlay] = useState(false);
  const [todos, setTodos] = useState([]);
  const { state, dispatch } = TodoState();
  const [inputValues, setInputValues] = useState({
    title: "",
    status: "",
  });

  const handleAddTodoOverlay = () => {
    setOpenUpdateTodoOverlay(false);
    setOpenAddTodoOverlay(true);
  };
  const handleAddTodoOverlayClose = () => {
    setOpenAddTodoOverlay(false);
  };

  const handleUpdateTodoOverlay = () => {
    setOpenAddTodoOverlay(false);
    setOpenUpdateTodoOverlay(true);
  };
  const handleUpdateTodoOverlayClose = () => {
    setOpenUpdateTodoOverlay(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // const addTodo = () => {
  //   const newTodos = {
  //     title: inputValues.title,
  //     status: inputValues.status,
  //   };
  //   setTodos((prevTodos) => [...prevTodos, newTodos]);
  //   console.log("todos added");
  // };
  const addTodo = async (e) => {
    e.preventDefault();

    try {
      if (typeof window !== "undefined") {
        const newTodos = {
          title: inputValues.title,
          status: inputValues.status,
        };
        setTodos((prevTodos) => [...prevTodos, newTodos]);

        console.log(newTodos);

        await axios.post(
          // "https://blog-api-host-iskq.onrender.com/api/v1/todos",
          "http://localhost:3001/api/v1/todos",
          newTodos
        );

        const response = await axios.get(
          // "https://blog-api-host-iskq.onrender.com/api/v1/todos"
          "http://localhost:3001/api/v1/todos"
        );

        dispatch({ type: "FETCH_INIT", payload: response.data });

        window.alert("Todo Created");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      window.alert("Failed to create the blog post");
    }
  };

  // const deleteTodo = (index) => {
  //   const deletedTodo = todos.filter((todo) => todo.index !== index);
  //   setTodos(deletedTodo);
  //   console.log("todo deleted");
  // };

  const deleteTodo = async (index) => {
    try {
      await dispatch({ type: "DELETE_BLOG", payload: index });
      window.alert("Deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      window.alert("Failed to delete the blog post");
    }
  };

  const updateTodo = (index) => {
    const updatedTodos = todos.map((todo, index) =>
      todo.index === inputValues.index
        ? {
            ...todo,
            title: inputValues.title,
            status: inputValues.status,
          }
        : todo
    );
    setTodos(updatedTodos);
  };
  return (
    <>
      <div className="w-full p-2 bg-blue-400 rounded-xl">
        <h1 className="text-2xl font-bold">To-Do-List</h1>
        <div className="flex justify-between">
          <span className="w-1/4 text-xl font-bold">To-Do-Title</span>
          <span className="w-2/4 text-xl font-bold">Status</span>
          <span className="w-1/4 text-xl font-bold">Modify</span>
          <span className="w-1/4 text-xl font-bold">Remove</span>
        </div>
        <div className="w-full border border-black"></div>
        <div className="flex flex-col justify-between bg-violet-700">
          {/* <span className="w-1/4 text-xl font-bold">Test_title</span>
          <span className="w-2/4 text-xl font-bold">Completed</span>
          <span className="w-1/4 text-xl font-bold bg-green-900">Update</span>
          <span className="w-1/4 text-xl font-bold bg-red-700">Delete</span> */}
          {todos.map((todo, index) => {
            return (
              <div
                className="flex justify-between w-full rounded-xl bg-violet-700"
                key={index}
              >
                <span className="w-1/4 text-xl font-bold">{todo.title}</span>
                <span className="w-2/4 text-xl font-bold">{todo.status}</span>
                <span
                  className="w-1/4 text-xl font-bold bg-green-900 cursor-pointer"
                  onClick={handleUpdateTodoOverlay}
                >
                  Update
                </span>
                <span
                  className="w-1/4 text-xl font-bold bg-red-700 cursor-pointer"
                  onClick={() => deleteTodo(todo.index)}
                >
                  Delete
                </span>
              </div>
            );
          })}
        </div>
        <div>
          <button
            className="p-2 mt-2 mb-2 bg-blue-700 rounded-xl"
            onClick={handleAddTodoOverlay}
          >
            Add Todo
          </button>
        </div>
      </div>
      <br />
      {openAddTodoOverlay ? (
        <div className="bg-gray-300 h-[10rem] flex flex-col w-3/4 overflow-auto rounded-3xl px-2 py-2">
          <div
            className="bg-red-700 cursor-pointer h-7 w-7 rounded-xl"
            onClick={handleAddTodoOverlayClose}
          >
            x
          </div>
          <div className="flex items-start justify-center gap-7">
            <label htmlFor="" className="text-xl text-blue-950">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={inputValues.title}
              id=""
              onChange={handleChange}
              className="w-2/4 border border-blue-800"
              placeholder="Enter Title"
            />
            <label htmlFor="status">Status</label>
            <input
              type="text"
              name="status"
              id="status"
              value={inputValues.status}
              onChange={handleChange}
              className="w-2/4 border border-blue-800"
              placeholder="Type Yes or No"
            />
          </div>
          <div>
            <button className="p-2 bg-blue-500 rounded-xl" onClick={addTodo}>
              Add
            </button>
          </div>
        </div>
      ) : null}

      {openUpdateTodoOverlay ? (
        <div className="bg-gray-300 h-[10rem] flex flex-col w-3/4 overflow-auto rounded-3xl px-2 py-2">
          <div
            className="bg-red-700 cursor-pointer h-7 w-7 rounded-xl"
            onClick={handleUpdateTodoOverlayClose}
          >
            x
          </div>

          <div className="flex items-start justify-center gap-7">
            <label htmlFor="" className="text-xl text-blue-950">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={inputValues.title}
              id=""
              onChange={handleChange}
              className="w-2/4 border border-blue-800"
              placeholder="Enter Title"
            />
            <label htmlFor="status">Status</label>
            <input
              type="text"
              name="status"
              id="status"
              value={inputValues.status}
              onChange={handleChange}
              className="w-2/4 border border-blue-800"
              placeholder="Type Yes or No"
            />
          </div>
          <div>
            <button className="p-2 bg-blue-500 rounded-xl" onClick={updateTodo}>
              Update
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;

import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import TodoReducer from "./TodoReducer";

const Todo = createContext();

const TodoContext = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, []);
  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/todos").then((res) => {
      // axios
      //   .get("https://blog-api-host-iskq.onrender.com/api/v1/todos")
      //   .then((res) => {
      dispatch({ type: "FETCH_INIT", payload: res.data });
    });
  }, []);

  return <Todo.Provider value={{ state, dispatch }}>{children}</Todo.Provider>;
};

export const TodoState = () => {
  return useContext(Todo);
};

export default TodoContext;

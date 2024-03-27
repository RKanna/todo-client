"use client";
import axios from "axios";
const TodoReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      // console.log(action);
      return action.payload.data;

    case "CREATE_TODO":
      axios.post("http://localhost:3001/api/v1/todos", action.payload);
      //   axios.post(
      //     "https://blog-api-host-iskq.onrender.com/api/v1/todos",
      //     action.payload
      //   );
      // Fetch the updated list of blogs from the server
      axios.get("http://localhost:3001/api/v1/todos").then((res) => {
        //   axios
        //     .get("https://blog-api-host-iskq.onrender.com/api/v1/todos")
        //     .then((res) => {
        dispatch({ type: "FETCH_INIT", payload: res.data });
      });

      return state;

    case "UPDATE_TODO":
      axios.put(
        `http://localhost:3001/api/v1/todos/${action.payload.index}`,
        // `https://blog-api-host-iskq.onrender.com/api/v1/todos/${action.payload._id}`,
        action.payload
      );
      return state.map((todo) =>
        todo.index === action.payload.index ? action.payload : todo
      );
    case "DELETE_TODO":
      axios.delete(`http://localhost:3001/api/v1/todos/${action.payload}`);
      //   axios.delete(
      //     `https://blog-api-host-iskq.onrender.com/api/v1/todos/${action.payload}`
      //   );
      return state.filter((todo) => todo.index !== action.payload);

    default:
      return state;
  }
};

export default TodoReducer;

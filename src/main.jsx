import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TodoContext from "./TodoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoContext>
      <App />
    </TodoContext>
  </React.StrictMode>
);

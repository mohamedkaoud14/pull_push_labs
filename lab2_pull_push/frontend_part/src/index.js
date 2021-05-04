import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import WebSockets from "./WebSockets";
// import WebSocketsRooms from "./WebSocketsRooms";
ReactDOM.render(
  <React.StrictMode>
    {/* <WebSocketsRooms /> */}
    <WebSockets />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

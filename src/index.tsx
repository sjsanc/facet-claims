import React from "react";
import ReactDOM from "react-dom";
import App from "./client/App";
import Context from "./client/context/Context";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);

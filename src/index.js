import React from "react";
import ReactDOM from "react-dom";
//import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";
import Observer from "./Observer";

ReactDOM.render(
  <React.StrictMode>
    <Observer />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

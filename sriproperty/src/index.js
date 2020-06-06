import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "./sriproperty.css";
import { BrowserRouter } from "react-router-dom";
import { format } from "path";

ReactDOM.render(
  <BrowserRouter>
    <App className="App" />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

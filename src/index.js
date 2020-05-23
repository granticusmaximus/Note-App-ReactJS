import React from "react";
import ReactDOM from "react-dom";
import "./Assets/css/App.css";
import App from "./Components/App";
import * as serviceWorker from "./Tests/serviceWorker";
import Firebase, { FirebaseContext } from "./Components/Firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

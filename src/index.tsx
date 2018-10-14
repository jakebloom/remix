import * as React from "react"
import * as ReactDOM from "react-dom"

import App from "./components/App"
import * as schedule from './input.json'

ReactDOM.render(
  <App schedule={schedule}/>,
  document.getElementById("root")
);

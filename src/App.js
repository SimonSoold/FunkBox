import React, { Component } from "react"
import "./App.scss"
//import { SqButton } from "./components/button/button.component.jsx"
import { FunkBox } from "./components/funkBox/funkBox.jsx"

class App extends Component {
  render() {
    return (
      <div className="funk-box-wrapper">
        <FunkBox />
      </div>
    )
  }
}

export default App

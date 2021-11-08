import React, { Component } from "react"
import "./App.scss"
import * as ToneBox from "./FunkBox.js"
import SequenceChannel from "./components/sequenceChannel"
import ControllItem from "./components/controlItem"

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          <span>FUNK</span>
          <span>BOX</span>
        </h1>
        <div className="sequenceContainer">
          {ToneBox.channelList.map((channel, index) => (
          <SequenceChannel key={index+"c"} channel={channel.name} changeStep={(step, channel) => ToneBox.changeStep(step, channel)}/>
          ))}
        </div>
        <div className="controlContainer">
          <ControllItem name="tempo" changeBpm={(value) => ToneBox.changeBpm(value)}/>
          <ControllItem name="volume" changeBpm={(value) => ToneBox.changeVolume(value)}/>
        </div>
        <div className="startButtonContainer">
          <button className="startButton" onClick={() => ToneBox.toggleLoop()}>
            <span className="startSpan">start</span>
          </button>
        </div>
      </div>
    )
  }
}

export default App
import React, { useState, useEffect } from "react"
import "./App.scss"
import { toggle, instruments, changeValue } from "./FunkBox.js"
//import * as ToneBox from "./FunkBox.js"
//import SequenceChannel from "./components/sequenceChannel"
//import ControllItem from "./components/controlItem"

const App = () => {
  const [isloaded, setLoad ] = useState(false)
  const start = () => {
    let startSpan = document.querySelector(".startSpan")
    startSpan.innerText = toggle(startSpan.innerText)
    if (!isloaded) setLoad(true)
  }
  const channelList = [
    "Kick",
    "Snare",
    "Hihat",
    "Shaker"
  ]
  return (
  <div className="App">
    <h1>
      <span>FUNK</span>
      <span>BOX</span>
    </h1>
    <div className="sequenceContainer">
      { isloaded ? channelList.map((channel, index) => (
      <SequenceChannel key={index} channel={channel
      }/>
      ))
      : <div></div>
      }
    </div>
    {
      isloaded ? 
      <div className="controlContainer">
        <ControllItem name="bpm"/>
        <DisplayItem name="bpm" />
        <ControllItem name="volume"/>
        <DisplayItem name="volume" />
      </div>
      : 
      <div className="menuController">

      </div>
    }
    <div className="startButtonContainer">
      <button className="startButton" onClick={() => start()}>
        <span className="startSpan">Let's Go</span>
      </button>
    </div>
  </div>
  )
}

const SequenceChannel = ({channel}) => {
  const patterns = [0, 1, 2, 3, 4, 5, 6, 7]
  const changeStep = (index) => {
    const stepDiv = document.querySelector("." + channel + index)
    const spanList = instruments[channel].setStep(index)
    stepDiv.innerHTML = spanList
  }
  return (
  <div className="sequenceChannel">
      {patterns.map((index) => (
        <button key={index} className="sequenceStep" onClick={() => changeStep(index)}>
            <div className={channel+index}>
            </div>
        </button>
      ))}
  </div>
  )
}


const ControllItem = ({name}) => {
  return (
  <div className={name+"Container"}>
      <button className="add" onClick={() => changeValue("up", name)}>
        +
      </button>
      <button className="sub" onClick={() => changeValue("down", name)}>
        -
      </button>
  </div>
  )
}

const DisplayItem = ({name}) => {
  console.log(name)
  return (
    <div className={"displayContainer " + name + "Display"}>
      <p>
        {name}
      </p>
      <p className="displayP">
        100
      </p>
    </div>
  )
}

export default App
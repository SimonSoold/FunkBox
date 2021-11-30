import React, { useState } from "react"
import "./App.scss"
import { toggle, instruments, changeValue, channelList } from "./FunkBox.js"

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

const App = () => {
  const [isloaded, setLoad ] = useState(false)
  const start = () => {
    let startSpan = document.querySelector(".startSpan")
    startSpan.innerText = toggle(startSpan.innerText)
    if (!isloaded) setLoad(true)
  }
  return (
  <div className="App">
    <h1>
      <span>FUNK</span>
      <span>BOX</span>
    </h1>
    <div className="sequenceContainer">
      { isloaded ? channelList().map((channel, index) => (
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
        <ControllItem name="swing"/>
        <DisplayItem name="swing" />
      </div>
      : 
      <div className="menuController">

      </div>
    }
    <div className="startButtonContainer">
      <button className="startButton" onClick={() => start()}>
        <span className="startSpan">Load</span>
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
  <div className={"sequenceChannel " + channel + "Step"}>
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
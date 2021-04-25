import React from "react"
import * as ToneBox from "../../FunkBox.js"
import { Screen } from "../funkBoxComp/screen/screen.jsx"
import { SequenceChannel } from "../funkBoxComp/sequenceChannel/sequenceChannel.jsx"
import { StartButton } from "../funkBoxComp/startButton/startButton.jsx"
import { Reglage } from "../funkBoxComp/reglage/reglage.jsx"
export const FunkBox = () => {
  return (
    <div className="funk-box">

<Reglage
        control="Bpm"
        onChange={(change) => ToneBox.changeBpm(change)}
        min="60"
        max="240"
        step="1"
      />
      <h1>
        <span className="h1a">FUNK</span>
        <span className="h1a">BOX</span>
      </h1>

      <div className="sequence-container">
        <SequenceChannel
          channel="Kick"
          changeStep={(step, channel) => ToneBox.changeStep(step, channel)}
        />
        <SequenceChannel
          channel="Hihat"
          changeStep={(step, channel) => ToneBox.changeStep(step, channel)}
        />
        <SequenceChannel
          channel="Noise"
          changeStep={(step, channel) => ToneBox.changeStep(step, channel)}
        />
        <SequenceChannel
          channel="Poly"
          changeStep={(step, channel) => ToneBox.changeStep(step, channel)}
        />
      </div>
      <Screen name={"Main"} />
      <button className="start-button" onClick={() => ToneBox.toggleLoop()}>
        <StartButton />
        <span className="start-span-wrapper">
          <span></span>
          <span className="start-span">start</span>
        </span>
      </button>
    </div>
  )
}

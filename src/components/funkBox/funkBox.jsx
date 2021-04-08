import React from "react"
import * as ToneBox from "../../FunkBox.js"
import { Screen } from "../funkBoxComp/screen/screen.jsx"
import { TapeWaves } from "../funkBoxComp/tapeWaves/tapeWaves.jsx"
import { SequenceChannel } from "../funkBoxComp/sequenceChannel/sequenceChannel.jsx"

export const FunkBox = () => {
  return (
    <div className="funk-box">
      <h1>
        Funk
        <br />
        Box
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
      <Screen name={"Main"}></Screen>
      <div className="tape-container">
        <TapeWaves />
        <div className="tape-panel"></div>
        <TapeWaves />
      </div>
      <button className="start-button" onClick={() => ToneBox.toggleLoop()}>
        start
      </button>
    </div>
  )
}

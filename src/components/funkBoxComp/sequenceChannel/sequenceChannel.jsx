import React from "react"

import { FunkLabel } from "../funkLabel/funkLabel.jsx"
import { Sequence } from "../sequence/sequence.jsx"
import { BlinkMeter } from "../blinkMeter/blinkMeter.jsx"

export const SequenceChannel = ({ channel, changeStep }) => {
  return (
    <div className="sequence-channel">
      <div className="sequence-panel">
        <FunkLabel label={channel} labelClass={"sequence-label"} />
        <BlinkMeter blinkName={channel} />
      </div>
      <Sequence changeStep={(step) => changeStep(step, channel + "Channel")} />
    </div>
  )
}

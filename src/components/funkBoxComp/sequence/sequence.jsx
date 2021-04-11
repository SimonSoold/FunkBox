import React from "react"
import {SequenceStep} from "../sequenceStep/sequenceStep.jsx"

export const Sequence = ({ changeStep }) => {
  const numbers = [0,1,2,3,4,5,6,7]
  return (
    <div className="sequence">
      <div className="sequence-buttons sequence-grid">
        {numbers.map(step => (<button key={step+"b"} className="sequence-step" onClick={() => changeStep(step)}>
        <SequenceStep />
      </button>))}
      </div>
      <div className="sequence-patterns sequence-grid"></div>
    </div>
  )
}

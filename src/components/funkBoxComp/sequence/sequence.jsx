import React from "react"

export const Sequence = ({ changeStep }) => {
  return (
    <div className="sequence">
      <button className="sequence-step" onClick={() => changeStep(0)}>
        One
      </button>
      <button className="sequence-step" onClick={() => changeStep(1)}>
        and
      </button>
      <button className="sequence-step" onClick={() => changeStep(2)}>
        Two
      </button>
      <button className="sequence-step" onClick={() => changeStep(3)}>
        and
      </button>
      <button className="sequence-step" onClick={() => changeStep(4)}>
        Three
      </button>
      <button className="sequence-step" onClick={() => changeStep(5)}>
        and
      </button>
      <button className="sequence-step" onClick={() => changeStep(6)}>
        Four
      </button>
      <button className="sequence-step" onClick={() => changeStep(7)}>
        and
      </button>
    </div>
  )
}

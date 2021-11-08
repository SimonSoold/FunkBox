import React from "react"

const SequenceChannel = ({changeStep, channel}) => {
    const numbers = [0,1,2,3,4,5,6,7]
    return (
        <div className="sequenceChannel">
            {numbers.map(step => (
            <button key={step+"b"} className="sequenceStep" onClick={(pattern) => pattern = changeStep(step, channel)}>
                <div className={channel+step}></div>
            </button>
            ))}
        </div>
    )
}

export default SequenceChannel
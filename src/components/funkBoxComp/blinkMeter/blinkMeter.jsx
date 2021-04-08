import React from "react"

export const BlinkMeter = ({ blinkName }) => {
  return (
    <div className={"blink-meter blink-" + blinkName}>
      <div className="blink-meter-thing"></div>
    </div>
  )
}

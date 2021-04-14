import React from "react"
import "./cube.scss"

export const Cube = ({ children }) => {
  return (
    <div className="scene-wrapper">
      <div className="scene">
        <div className="cube">
          <div className="cube__face cube__face--front">{children}</div>
          <div className="cube__face cube__face--back">back</div>
          <div className="cube__face cube__face--right">right</div>
          <div className="cube__face cube__face--left">left</div>
          <div className="cube__face cube__face--top">top</div>
          <div className="cube__face cube__face--bottom">bottom</div>
        </div>
      </div>
    </div>
  )
}

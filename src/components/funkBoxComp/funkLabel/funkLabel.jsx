import React from "react"

export const FunkLabel = ({ label, labelClass }) => {
  return <label className={"label " + labelClass}>{label}</label>
}

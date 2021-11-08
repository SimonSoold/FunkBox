import React from "react"

const ControllItem = ({name, changeBpm}) => {
    return (
    <div className={name+"Container"}>
        <button className="add" onClick={() => changeBpm(true)}>
          +
        </button>
        <button className="sub" onClick={() => changeBpm(false)}>
          -
        </button>
    </div>
    )
}

export default ControllItem
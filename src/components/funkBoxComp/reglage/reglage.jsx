import React from "react"

export const Reglage = ({ control, onChange, min, max, step }) => {
  return (
    <div className="reglage-wrapper">
      <svg
        width="134"
        height="134"
        viewBox="0 0 134 134"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="reglage-svg"
      >
        <circle cx="67" cy="67" r="67" fill="#919995" />
        <circle
          cx="67"
          cy="67"
          r="65.8"
          stroke="#3A3331"
          strokeOpacity="0.57"
          strokeWidth="2.4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M68 5.47495C67.7058 4.53689 67.3643 4 67 4C66.6357 4 66.2942 4.53689 66 5.47495V22.6854L67 25L68 22.6854V5.47495Z"
          fill="#2F3733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M66 128.595C66.2942 129.489 66.6357 130 67 130C67.3643 130 67.7058 129.489 68 128.595V111.204L67 109L66 111.204V128.595Z"
          fill="#2F3733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M128.595 68C129.489 67.7058 130 67.3643 130 67C130 66.6357 129.489 66.2942 128.595 66H111.204L109 67L111.204 68H128.595Z"
          fill="#2F3733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.55259 66C4.56516 66.2942 4.00001 66.6357 4.00001 67C4.00001 67.3643 4.56516 67.7058 5.55259 68H22.5635L25 67L25 67V67L25 67L22.5635 66H5.55259Z"
          fill="#2F3733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M106.27 30.4075C106.694 29.5678 106.814 28.9647 106.556 28.7071C106.299 28.4495 105.696 28.5696 104.856 28.9933L92.5588 41.2905L91.7071 43.5563L93.973 42.7047L106.27 30.4075Z"
          fill="#2F3733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.4075 28.9933C29.5678 28.5695 28.9647 28.4495 28.7071 28.7071C28.4495 28.9647 28.5696 29.5677 28.9933 30.4075L41.2905 42.7047L43.5563 43.5563L42.7047 41.2904L30.4075 28.9933Z"
          fill="#2F3733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28.9933 104.856C28.5696 105.696 28.4495 106.299 28.7071 106.556C28.9647 106.814 29.5678 106.694 30.4075 106.27L42.7047 93.973L43.5564 91.7071L41.2905 92.5587L28.9933 104.856Z"
          fill="#2F3733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.856 106.27C105.696 106.694 106.299 106.814 106.556 106.556C106.814 106.299 106.694 105.696 106.27 104.856L93.973 92.5588L91.7071 91.7071L92.5588 93.973L104.856 106.27Z"
          fill="#2F3733"
        />
      </svg>
      <svg
        width="134"
        height="134"
        viewBox="0 0 134 134"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"reglage-svg reglage-svg-" + control}
        transform="rotate(0)"
      >
        <circle
          cx="67"
          cy="67"
          r="44.6"
          fill="#070011"
          stroke="#3A3331"
          strokeWidth="0.8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M111.264 68C111.732 67.7058 112 67.3643 112 67C112 66.6357 111.732 66.2942 111.264 66H102.155L101 67L102.155 68H111.264Z"
          fill="#DC5765"
        />
      </svg>
      <input
        className={"reglage-input reglage-input-" + control}
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className={"reglage-p-" + control}>60 bpm</p>
    </div>
  )
}
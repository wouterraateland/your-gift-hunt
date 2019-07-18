import React from "react"

const ProgressRing = ({
  radius = 16,
  stroke = 2,
  progress = 0,
  bgColor = "#0002",
  ...otherProps
}) => {
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI

  return (
    <svg height={radius * 2} width={radius * 2} {...otherProps}>
      <circle
        stroke={bgColor}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference - progress * circumference}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
    </svg>
  )
}

export default ProgressRing

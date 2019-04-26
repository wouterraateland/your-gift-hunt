import React, { Fragment, memo } from "react"
import { EDGE_TYPES } from "data"

export const getArrowColor = type => {
  switch (type) {
    case EDGE_TYPES.TRANSFORM:
    case EDGE_TYPES.EXIT:
      return "#f93"
    case EDGE_TYPES.UNLOCK:
    case EDGE_TYPES.ENTRY:
      return "#39f"
    case EDGE_TYPES.USE:
      return "#3f9"
    case EDGE_TYPES.INFO:
      return "#f39"
    default:
      return "#ccc"
  }
}

const ArrowDefs = memo(() => (
  <svg>
    <defs>
      {Object.values(EDGE_TYPES).map(type => (
        <Fragment key={type}>
          <marker
            id={`circle-${type}`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            markerUnits="strokeWidth"
            orient="auto"
          >
            <path
              d="M 5, 5 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0"
              fill={getArrowColor(type)}
            />
          </marker>
          <marker
            id={`arrow-${type}`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            markerUnits="strokeWidth"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={getArrowColor(type)} />
          </marker>
        </Fragment>
      ))}
    </defs>
  </svg>
))

export default ArrowDefs

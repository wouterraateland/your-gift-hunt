import React from "react"
import styled, { css } from "styled-components"

import ToolTip from "./ToolTip"

const StyledType = styled.div`
  pointer-events: auto;

  position: relative;
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  border-radius: 0.1em;

  background-color: #0004;

  text-align: center;
  color: #fff;
  font-size: 0.8em;

  ${props =>
    props.isMulti &&
    css`
      font-size: 0.6664em;
      box-shadow: 0.125em 0.125em #fff, 0.25em 0.25em #0004;
    `}
`

const getTypeIcon = type => {
  switch (type) {
    case "text":
    case "textarea":
      return "T"
    case "number":
      return "1"
    case "geopoint":
      return "×"
    case "datetime-local":
      return "◷"
    default:
      return "?"
  }
}

const InputType = ({ type = "text", isMulti, showInfo = true }) => (
  <StyledType isMulti={isMulti}>
    {getTypeIcon(type)}
    {showInfo && (
      <ToolTip>
        <strong>
          {type.toUpperCase()[0]}
          {type.substr(1)} field
        </strong>
        <br />
        {isMulti && `Accepts multiple values`}
      </ToolTip>
    )}
  </StyledType>
)

export default InputType

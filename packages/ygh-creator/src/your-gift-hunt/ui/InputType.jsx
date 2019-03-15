import React from "react"
import styled, { css } from "styled-components"

import ToolTip from "./ToolTip"

const DefaultType = styled.div`
  pointer-events: auto;

  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-left: 0.5em;
  border-radius: 0.1em;

  background-color: #0004;

  text-align: center;

  &::after {
    color: #fff;

    font-size: 0.8em;
    line-height: 1.25em;
  }

  ${props =>
    props.isMulti &&
    css`
      box-shadow: 0.1em 0.1em #fff, 0.2em 0.2em #0004;
    `}
`

const TextType = styled(DefaultType)`
  &::after {
    content: "T";
  }
`

const NumberType = styled(DefaultType)`
  &::after {
    content: "1";
  }
`

const GeopointType = styled(DefaultType)`
  &::after {
    content: "×";
  }
`

const DatetimeLocalType = styled(DefaultType)`
  &::after {
    content: "◷";
  }
`

const getBaseComponent = type => {
  switch (type) {
    case "text":
    case "textarea":
      return TextType
    case "number":
      return NumberType
    case "geopoint":
      return GeopointType
    case "datetime-local":
      return DatetimeLocalType
    default:
      return DefaultType
  }
}

const InputType = ({ type, isMulti, isSecret, showInfo = true }) => {
  const Component = getBaseComponent(type)
  return (
    <Component isMulti={isMulti}>
      {showInfo && (
        <ToolTip>
          <strong>
            {type.toUpperCase()[0]}
            {type.substr(1)} input
          </strong>
          <br />
          {isMulti && (
            <>
              Accepts multiple values
              <br />
            </>
          )}
          {isSecret && (
            <>
              Not visible for players
              <br />
            </>
          )}
        </ToolTip>
      )}
    </Component>
  )
}

export default InputType

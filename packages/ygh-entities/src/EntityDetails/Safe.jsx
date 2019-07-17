import React, { forwardRef } from "react"
import styled, { css } from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"

const SafeBack = styled(Entity)`
  border-radius: 1em;
  box-shadow: inset 0 0 0 1em #37474f !important;

  background-color: #263238;
`

const SafeFront = styled(Entity)`
  border-radius: 1em;

  overflow: hidden;

  box-shadow: inset 0.25em 0.25em 0.5em 0 #fff4,
    inset -0.25em -0.25em 0.5em 0 #0004 !important;

  background-image: linear-gradient(
    #263238,
    #263238 1em,
    transparent 1em,
    transparent 15em,
    #263238 15em,
    #263238
  );
  background-color: #37474f;
  color: #fff;

  transition-property: left, width, border-width;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  ${props =>
    props.isUnlocked &&
    css`
      left: -1em;
      width: 0;
      border-right: 1em solid #37474f;
    `}
`

const Safe = forwardRef(({ Front, children, ...props }, ref) => {
  const isUnlocked = _.hasState("unlocked")(props)

  return (
    <SafeBack {...props}>
      {children}
      <SafeFront {...props} isUnlocked={isUnlocked} isInteractive={!isUnlocked}>
        <Front ref={ref} {...props} isInteractive={!isUnlocked} />
      </SafeFront>
    </SafeBack>
  )
})

Safe.defaultProps = {
  ...Entity.defaultProps,
  width: 16,
  height: 16
}

export default Safe

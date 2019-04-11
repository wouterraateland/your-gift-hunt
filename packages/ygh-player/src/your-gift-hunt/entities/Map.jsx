import React, { forwardRef } from "react"
import styled, { css } from "styled-components"

import Entity from "./Entity"
import MapTexture from "./MapTexture"

const incompleteClipPath =
  "1.5% 50%, 20% 45%, 45% 47.5%, 50% 40%, 45% 25%, 47.5% 5%, 70% 8%, 96% 2%, 100% 20%, 90% 25%, 95% 30%, 100% 60%, 95% 90%, 90% 98%, 70% 95%, 20% 100%, 0% 95%, 5% 60%"

const completeClipPath =
  "1.5% 50%, 5% 10%, 12% 3%, 20% 2%, 18% 10%, 28% 12%, 25% 5%, 47.5% 5%, 70% 8%, 96% 2%, 100% 20%, 90% 25%, 95% 30%, 100% 60%, 95% 90%, 90% 98%, 70% 95%, 20% 100%, 0% 95%, 5% 60%"

const StyledMap = styled(Entity)`
  background-color: #d0c6b0;

  &,
  &::before {
    clip-path: polygon(
      ${props => (props.isComplete ? completeClipPath : incompleteClipPath)}
    );
  }

  &::before {
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0.5em #0009;
  }

  ${props =>
    !props.isClean &&
    css`
      &::after {
        width: 100%;
        height: 100%;
        background-image: radial-gradient(
            ellipse 40% 40% at 45% 55%,
            #0006,
            transparent
          ),
          radial-gradient(ellipse 60% 30% at 20% 60%, #0009, transparent),
          radial-gradient(ellipse 15% 90% at 65% 30%, #0009, transparent);
        transform: rotate(-20deg);
      }
    `}
`
StyledMap.displayName = "Map"

const StatefulMap = forwardRef((props, ref) => {
  const isClean = props.state === "Clean"
  const isComplete = props.state === "Dusty" || isClean

  return (
    <StyledMap {...props} ref={ref} isComplete={isComplete} isClean={isClean}>
      <MapTexture />
    </StyledMap>
  )
})
StatefulMap.name = "Map"
StatefulMap.templateName = "Map"
StatefulMap.defaultProps = {
  ...Entity.defaultProps,
  z: 0.25,
  width: 2,
  height: 2
}

export default StatefulMap

import React, { forwardRef, useCallback, useState } from "react"
import styled, { css } from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"
import MapTexture from "./MapTexture"

const incompleteClipPath =
  "1.5% 50%, 20% 45%, 45% 47.5%, 50% 40%, 45% 25%, 47.5% 5%, 70% 8%, 96% 2%, 100% 20%, 90% 25%, 95% 30%, 100% 60%, 95% 90%, 90% 98%, 70% 95%, 20% 100%, 0% 95%, 5% 60%"

const completeClipPath =
  "1.5% 50%, 5% 10%, 12% 3%, 20% 2%, 18% 10%, 28% 12%, 25% 5%, 47.5% 5%, 70% 8%, 96% 2%, 100% 20%, 90% 25%, 95% 30%, 100% 60%, 95% 90%, 90% 98%, 70% 95%, 20% 100%, 0% 95%, 5% 60%"

const StyledMap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: #d0c6b0;

  clip-path: polygon(
    ${props => (props.isComplete ? completeClipPath : incompleteClipPath)}
  );

  transform: rotateY(${props => (props.isTurned ? 180 : 0)}deg);

  transition: transform 0.4s ease-in-out;

  &::before,
  &::after {
    content: "";

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    box-shadow: inset 0 0 0.5em #0009;
  }

  &::after {
    ${props =>
      props.isClean
        ? css`
          content: "${props.code}";

          opacity: ${props.isTurned ? 1 : 0};

          padding: 3em .5em 0 0;

          text-align: right;
          font-family: ${props.theme.font.heading};
          font-size: .25em;

          box-shadow: inset 0 0 0.75em 0.75em #0009;

          background-color: #d0c6b0;

          transform: scale(-1.25, 1.25) rotate(10deg);
          transition: opacity 0s .2s ease-in-out;
          `
        : css`
          opacity: ${1 - props.cleanliness * 2}
          background-image: radial-gradient(
              ellipse 40% 40% at 45% 55%,
              #0006,
              transparent
            ),
            radial-gradient(ellipse 60% 30% at 20% 60%, #0009, transparent),
            radial-gradient(ellipse 15% 90% at 65% 30%, #0009, transparent);
          transform: rotate(-20deg);
    `}
  }
`
StyledMap.displayName = "Map"

const StatefulMap = forwardRef(
  ({ dispatchInputAction, children, ...props }, ref) => {
    const [isTurned, setTurned] = useState(false)
    const isClean = _.hasState("Clean")(props)
    const isComplete = _.hasState("Dusty")(props) || isClean

    const cleanliness = _.getInputValue("part_cleaned")(props) || 0
    const code = _.getInformationSlotValue("Code")(props) || ""

    const onClick = useCallback(() => {
      if (isClean) {
        setTurned(isTurned => !isTurned)
      } else if (isComplete) {
        dispatchInputAction(props.state, "part_cleaned", cleanliness + 0.1)
      }
    }, [props.state, isClean, isComplete, cleanliness])

    return (
      <Entity {...props} noVisual>
        <StyledMap
          onClick={onClick}
          ref={ref}
          isComplete={isComplete}
          isClean={isClean}
          isTurned={isTurned}
          cleanliness={cleanliness}
          code={code}
        >
          <MapTexture />
        </StyledMap>
        {children}
      </Entity>
    )
  }
)
StatefulMap.name = "Map"
StatefulMap.templateName = "Map"
StatefulMap.defaultProps = {
  ...Entity.defaultProps,
  z: 0.25,
  width: 2,
  height: 2
}
StatefulMap.states = ["Incomplete", "Dusty", "Complete"]
StatefulMap.Detail = StatefulMap

export default StatefulMap

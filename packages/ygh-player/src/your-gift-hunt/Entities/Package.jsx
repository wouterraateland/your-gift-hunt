import React, { forwardRef } from "react"
import styled, { css } from "styled-components"
import _ from "utils"

import Entity from "./Entity"

const Bottom = styled(Entity)`
  border-radius: 0.1em;

  background: radial-gradient(
    ${_.darken(0.1)("#b38d5c")},
    ${_.darken(0.15)("#b38d5c")}
  );
`

const Flap = styled(Entity)`
  border-radius: 0.1em 0.2em 0.2em 0.1em;

  &::before {
    width: 100%;
    height: 100%;

    box-shadow: inset 0.1em 0 0.2em #0009, inset -0.2em 0 0.1em -0.1em #0004;
  }

  transition-property: transform, background-color;
  transition-duration: 0.8s;

  transform: scale(${props => (props.isOpen ? -0.5 : 1)}, 1);

  ${({ isOpen, rotation }) =>
    isOpen
      ? css`
          background-color: ${_.darken(0.05)("#b38d5c")};

          transition-delay: ${rotation % 180 === 0 ? 0.6 : 0}s;

          transition-timing-function: cubic-bezier(0.6, 0.5, 0.35, 2.25);
        `
      : css`
          transition-timing-function: cubic-bezier(0.65, -1.25, 0.4, 0.5);

          background-color: ${_.darken(rotation % 180 === 0 ? 0 : -0.05)(
            "#b38d5c"
          )};
          transition-delay: ${rotation % 180 === 0 ? 0 : 0.6}s;
        `}
`
Flap.defaultProps = {
  ...Entity.defaultProps,
  origin: { left: 0 },
  z: 0.25,
  isInteractive: false
}

const Package = forwardRef(
  (
    { containedEntities = [], dispatchInputAction, children, ...props },
    ref
  ) => {
    const isOpen = _.hasState("open")(props)

    return (
      <Bottom
        {...props}
        onClick={() => dispatchInputAction(props.state)}
        ref={ref}
      >
        {children}
        <Flap
          isOpen={isOpen}
          width={props.width / 2}
          height={props.height}
          left="0"
        />
        <Flap
          isOpen={isOpen}
          width={props.width / 2}
          height={props.height}
          rotation={180}
          left="100%"
        />
        <Flap
          isOpen={isOpen}
          width={props.height / 2}
          height={props.width}
          rotation={90}
          top="0"
        />
        <Flap
          isOpen={isOpen}
          width={props.height / 2}
          height={props.width}
          rotation={270}
          top="100%"
        />
      </Bottom>
    )
  }
)
Package.name = "Package"
Package.templateName = "Package"
Package.defaultProps = {
  ...Entity.defaultProps,
  width: 3.5,
  height: 3.5,
  z: 1.5
}

export default Package

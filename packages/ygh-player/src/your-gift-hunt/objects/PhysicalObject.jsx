import React, { Children, cloneElement, memo } from "react"
import styled, { css, keyframes } from "styled-components"

const pulseScale = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
  50% { opacity: 1; }
  to { opacity: 0; transform: translate(-50%, -50%) scale(1.1); }
`

const ObjectPart = styled.div.attrs(({ parentAngle, angle, z }) => ({
  style: {
    boxShadow: `
      ${(Math.cos((-(-45 + parentAngle + angle) * Math.PI) / 180) * z) / 3}em
      ${(Math.sin((-(-45 + parentAngle + angle) * Math.PI) / 180) * z) / 3}em
      ${z / 2}em ${-z / 8}em
      #0009`
  }
}))`
  position: absolute;

  &::before,
  &::after {
    content: "";

    position: absolute;
  }
`

ObjectPart.defaultProps = {
  parentAngle: 0,
  angle: 0,
  z: 1
}

const StyledPhysicalObject = styled.div.attrs(({ width, height }) => ({
  style: {
    width: `${width}em`,
    height: `${height}em`
  }
}))`
  position: relative;
  pointer-events: ${props => (props.interactive ? "auto" : "none")};

  ${({ attract, width, height }) =>
    attract &&
    css`
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;

        width: ${1.5 * Math.max(width, height)}em;
        height: ${1.5 * Math.max(width, height)}em;
        border: 0.2em solid #f3de20;
        border-radius: 100%;

        animation: ${pulseScale} 2s ease-in-out infinite;
      }
    `}
`

const PhysicalObject = memo(({ children, parentAngle, ...props }) => {
  const childrenWithParentAngle = Children.map(children, child =>
    cloneElement(child, { parentAngle })
  )

  return (
    <StyledPhysicalObject {...props}>
      {childrenWithParentAngle}
    </StyledPhysicalObject>
  )
})

PhysicalObject.defaultProps = {
  parentAngle: 0,
  width: 1,
  height: 1,
  interactive: true
}

PhysicalObject.Part = memo(ObjectPart)

export default PhysicalObject

import React, { forwardRef } from "react"
import styled from "styled-components"

import Entity from "../Entity"

const wallPieces = [
  { left: 0, top: 0, width: 3, height: 1 },
  { left: 11, top: 0, width: 19, height: 1 },
  { left: 0, top: 0, width: 1, height: 20 },
  { left: 0, top: 24, width: 1, height: 2 },
  { left: 0, top: 30, width: 1, height: 6 },
  { left: 29, top: 0, width: 1, height: 15 },
  { left: 29, top: 21, width: 1, height: 15 },
  { left: 0, top: 35, width: 10, height: 1 },
  { left: 15, top: 35, width: 15, height: 1 },
  { left: 15, top: 26, width: 1, height: 10 }
]

const DIRECTION = {
  HORIZONTAL: 0,
  VERTICAL: 1
}

const windows = [
  { l: 0, t: 20, s: 4, d: DIRECTION.VERTICAL, show: true },
  { l: 0, t: 26, s: 4, d: DIRECTION.VERTICAL, show: true },
  { l: 3, t: 0, s: 8, d: DIRECTION.HORIZONTAL, show: true },
  { l: 29, t: 15, s: 6, d: DIRECTION.VERTICAL, show: false }
].map(({ l, t, d, s, show }) => ({
  left: `${l}em`,
  top: `${t}em`,
  width: `${d === DIRECTION.HORIZONTAL ? s : 0.5}em`,
  height: `${d === DIRECTION.VERTICAL ? s : 0.5}em`,
  d,
  show
}))

const Roof = styled(Entity)`
  border-radius: 0.25em;
  background-color: ${props =>
    props.state === "Invisible" ? "#000" : "transparent"};
  transition: background-color 0.5s ease-out;
`
Roof.defaultProps = {
  ...Entity.defaultProps,
  noVisual: true
}

const WallPiece = styled(Entity)`
  border-radius: 0.25em;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: 0.25em;

    background: #000;
  }
`
WallPiece.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  origin: { left: 0, top: 0 }
}

const Window = styled(Entity).attrs(props => ({
  style: {
    ...props.style,
    margin: props.d === DIRECTION.VERTICAL ? "0 .25em" : ".25em 0",
    boxShadow:
      props.show && props.isReachable
        ? Array(10)
            .fill()
            .map(
              (_, i) => `
        ${Math.cos(
          (-(-45 + props.parentRotation + props.rotation) * Math.PI) / 180
        ) *
          0.05 *
          (i * (i + 9))}em
        ${Math.sin(
          (-(-45 + props.parentRotation + props.rotation) * Math.PI) / 180
        ) *
          0.05 *
          (i * (i + 9))}em
        ${0.2 * i}em ${0.1 * i}em`
            )
            .join(", ")
        : null
  }
}))`
  color: #faf8d840;
  background: #c5e8f799;
`
Window.defaultProps = {
  z: 0,
  origin: { left: 0, top: 0 },
  isContainer: true
}

const Wall = forwardRef((props, ref) => (
  <Entity {...props} ref={ref} noVisual>
    {windows.map((w, i) => (
      <Window
        key={i}
        rotation={props.rotation}
        parentRotation={props.parentRotation}
        {...w}
        isReachable={props.isReachable}
      />
    ))}
    {wallPieces.map((piece, i) => (
      <WallPiece key={i} {...piece} />
    ))}
    <Roof
      {...props}
      width={props.width - 1}
      height={props.height - 1}
      noVisual
      isInteractive={props.state === "Invisible"}
    />
  </Entity>
))
Wall.name = "Wall"
Wall.templateName = "Wall"
Wall.defaultProps = {
  ...Entity.defaultProps,
  width: 30,
  height: 36,
  isInteractive: false,
  isContainer: true,
  z: 5
}

export default Wall

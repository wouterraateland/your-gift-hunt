import React, { forwardRef, useCallback, useMemo } from "react"
import styled, { css } from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"

const generateStones = parentRotation =>
  [
    { left: 0.7, top: 2.6, width: 2.5, height: 3.0, rotation: 5 },
    { left: 3.1, top: 7.0, width: 4.0, height: 3.0, rotation: 235 },
    { left: 1.0, top: 11.0, width: 2.5, height: 4.0, rotation: 38 },
    { left: 4.0, top: 2.0, width: 3.0, height: 2.0, rotation: 59 },
    { left: 0.0, top: 8.0, width: 3.0, height: 2.0, rotation: 20 },
    { left: 5.0, top: 12.0, width: 2.5, height: 3.5, rotation: 250 },
    { left: 3.0, top: 14.1, width: 1.5, height: 1.5, rotation: 80 },
    { left: 3.8, top: 11.2, width: 2.0, height: 1.5, rotation: 110 },
    { left: 3.6, top: 13.0, width: 1.0, height: 0.8, rotation: 294 },
    { left: 3.3, top: 13.7, width: 0.4, height: 0.3, rotation: 190 },
    { left: 1.5, top: 15.0, width: 1.5, height: 1.0, rotation: 350 },
    { left: 3.0, top: 9.6, width: 1.3, height: 1.8, rotation: 330 },
    { left: 0.3, top: 10.0, width: 1.5, height: 2.0, rotation: 80 },
    { left: 0.2, top: 12.0, width: 0.8, height: 0.7, rotation: 320 },
    { left: 6.0, top: 9.8, width: 1.5, height: 2.5, rotation: 30 },
    { left: 4.6, top: 10.5, width: 1.2, height: 0.4, rotation: 185 },
    { left: 2.1, top: 10.2, width: 0.7, height: 0.8, rotation: 170 },
    { left: 0.1, top: 9.7, width: 0.7, height: 0.5, rotation: 10 },
    { left: 1.7, top: 5.7, width: 1.5, height: 2.5, rotation: 355 },
    { left: 0.5, top: 5.5, width: 1.0, height: 1.6, rotation: 25 },
    { left: 0.8, top: 7.1, width: 0.8, height: 0.6, rotation: 330 },
    { left: 3.0, top: 8.2, width: 0.4, height: 1.3, rotation: 160 },
    { left: 5.6, top: 12.0, width: 0.4, height: 0.5, rotation: 150 },
    { left: 3.3, top: 4.2, width: 2.4, height: 2.0, rotation: 40 },
    { left: 3.1, top: 6.0, width: 1.0, height: 0.6, rotation: 48 },
    { left: 2.9, top: 5.3, width: 0.4, height: 0.5, rotation: 0 },
    { left: 3.3, top: 3.0, width: 1.2, height: 1.0, rotation: 150 },
    { left: 4.5, top: 15.2, width: 1.0, height: 0.8, rotation: 15 },
    { left: 6.1, top: 14.9, width: 0.8, height: 1.4, rotation: 80 },
    { left: 7.2, top: 14.8, width: 0.7, height: 0.8, rotation: 170 },
    { left: 3.7, top: 15.6, width: 0.5, height: 0.4, rotation: 160 },
    { left: 7.2, top: 11.8, width: 0.9, height: 0.7, rotation: 40 },
    { left: 5.4, top: 5.9, width: 1.0, height: 1.0, rotation: 60 },
    { left: 5.8, top: 4.5, width: 0.9, height: 1.3, rotation: 10 },
    { left: 6.2, top: 6.9, width: 0.7, height: 0.6, rotation: 30 },
    { left: 7.0, top: 8.8, width: 0.5, height: 0.9, rotation: 170 },
    { left: 7.3, top: 15.7, width: 0.7, height: 0.3, rotation: 165 },
    { left: 2.5, top: 1.3, width: 1.8, height: 1.5, rotation: 80 },
    { left: 4.2, top: 0.4, width: 1.0, height: 1.3, rotation: 60 },
    { left: 5.6, top: 0.2, width: 1.7, height: 1.6, rotation: 132 },
    { left: 6.5, top: 1.9, width: 0.7, height: 1.1, rotation: 170 },
    { left: 7.1, top: 1.4, width: 0.6, height: 0.7, rotation: 45 },
    { left: 7.4, top: 0.5, width: 0.5, height: 0.9, rotation: 10 },
    { left: 7.1, top: 0.0, width: 0.5, height: 0.5, rotation: 244 },
    { left: 1.2, top: 0.2, width: 1.4, height: 1.2, rotation: 187 },
    { left: 2.7, top: 0.1, width: 1.4, height: 0.9, rotation: 198 },
    { left: 4.1, top: 0.0, width: 0.7, height: 0.5, rotation: 166 },
    { left: 5.2, top: -0.1, width: 0.5, eighth: 0.7, rotation: 291 },
    { left: 0.1, top: 0.5, width: 0.9, height: 0.8, rotation: 51 },
    { left: 0.8, top: 0.1, width: 0.5, height: 0.5, rotation: 116 },
    { left: 0.0, top: 0.1, width: 0.6, height: 0.4, rotation: 337 },
    { left: 0.4, top: 1.4, width: 1.2, height: 1.3, rotation: 47 },
    { left: 0.2, top: 2.7, width: 0.6, height: 0.8, rotation: 12 },
    { left: 1.7, top: 1.7, width: 1.0, height: 0.7, rotation: 64 }
  ]
    .map(stone => ({
      top: `${stone.top}em`,
      left: `${stone.left}em`,
      width: `${stone.width}em`,
      height: `${stone.height}em`,
      transform: `rotate(${stone.rotation}deg)`,
      rotation: stone.rotation,
      scale: Math.min(stone.width, stone.height) / 3
    }))
    .map(({ scale, rotation, ...stone }) => ({
      ...stone,
      boxShadow: `inset ${Math.cos(
        ((270 - rotation - parentRotation) * Math.PI) / 180
      ) * scale}em ${Math.sin(
        ((270 - rotation - parentRotation) * Math.PI) / 180
      ) * scale}em ${scale}em #0004`
    }))

const Stone = styled.div`
  position: absolute;
  border-radius: 80% 110% 90% 120% / 120% 110% 90% 80%;

  background-color: #777;

  ${props =>
    props.isTurned &&
    css`
      background-color: #333;
      border-radius: 110% 80% 120% 90% / 110% 120% 80% 90%;
    `}
`
Stone.displayName = "Path.Stone"

const Path = forwardRef(({ dispatchInputAction, children, ...props }, ref) => {
  const stones = useMemo(() => generateStones(props.parentRotation), [
    props.parentRotation
  ])

  const isTurned = _.hasState("turned")(props)
  const onStoneClick = useCallback(
    () => dispatchInputAction(props.state, "pebble", "loose pebble"),
    []
  )

  return (
    <Entity
      noVisual
      {...props}
      ref={ref}
      style={{
        width: "8em",
        height: "16em",
        transformOrigin: "top left",
        transform: `scale(${props.width / 8}, ${props.height / 16})`
      }}
    >
      {stones.map((stone, i) =>
        i === 1 ? (
          <Stone
            key={i}
            style={stone}
            onClick={onStoneClick}
            isTurned={isTurned}
          />
        ) : (
          <Stone key={i} style={stone} />
        )
      )}
      {children}
    </Entity>
  )
})
Path.name = "Path"
Path.templateName = "Path"
Path.defaultProps = {
  ...Entity.defaultProps,
  width: 8,
  height: 16
}

export default Path

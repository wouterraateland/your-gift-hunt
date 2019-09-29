import React, { forwardRef, useMemo } from "react"
import styled from "styled-components"
import { readableColor } from "polished"
import _ from "ygh-utils"

import Entity from "../Entity"

const StyledCake = styled(Entity)`
  border-radius: 100%;
  box-shadow: inset 0 0 0.25em #0006;

  mask: ${({ piecesLeft }) =>
    `conic-gradient(#000 ${(piecesLeft * 360) /
      6}deg, transparent ${(piecesLeft * 360) / 6 + 3}deg)`};
  background: currentColor;
`

const BlackBerry = styled.div`
  position: absolute;
  width: 0.5em;
  height: 0.5em;

  border-radius: 100%;
  box-shadow: inset 0 0 0.25em #0009, 0 0 0.25em #0009;

  background-color: #5a2cc3;
`

const StrawBerry = styled.div`
  position: absolute;
  width: 0.5em;
  height: 0.5em;

  border-radius: 100% 20% 10% 20%;
  box-shadow: inset 0 0 0.25em #0009, 0 0 0.25em #0009;

  background-color: #f22c21;
`

const Text = styled.em`
  position: absolute;
  top: 50%;
  left: 50%;

  text-align: center;
  text-shadow: 0 0 0.25rem #0009;

  transform: translate(-50%, -50%);
`

const cakeStates = [
  "Complete",
  "5 left",
  "4 left",
  "3 left",
  "2 left",
  "1 left"
]

const Cake = forwardRef(({ children, ...props }, ref) => {
  const berryCount = (props.width + props.height) * 2

  const berries = useMemo(
    () =>
      Array(berryCount)
        .fill()
        .map((_, i) => ({
          top: `${props.height / 2 +
            0.5 *
              (props.height - 1) *
              Math.sin((2 * i * Math.PI) / berryCount)}em`,
          left: `${props.width / 2 +
            0.5 *
              (props.width - 1) *
              Math.cos((2 * i * Math.PI) / berryCount)}em`,
          transform: `translate(-50%, -50%) scale(${0.5 +
            0.5 * Math.abs(Math.sin(i))}) rotate(${(i * 32435) % 360}deg)`
        })),
    [berryCount]
  )

  const piecesLeft =
    6 - cakeStates.findIndex(cakeState => _.hasState(cakeState)(props))

  return (
    <StyledCake {...props} ref={ref} piecesLeft={piecesLeft}>
      {berries.map((berry, i) =>
        i % 2 ? (
          <BlackBerry key={i} style={berry} />
        ) : (
          <StrawBerry key={i} style={berry} />
        )
      )}
      <Text
        style={{
          fontSize: `${Math.sqrt((props.width - 1) * (props.height - 1)) /
            5}em`,
          color: readableColor(props.color, "#f12", "#fafbf5")
        }}
      >
        {_.getFieldValue("Text")(props)}
      </Text>
      {children}
    </StyledCake>
  )
})
Cake.name = "Cake"
Cake.templateName = "Cake"
Cake.defaultProps = {
  ...Entity.defaultProps,
  width: 3,
  height: 3,
  color: "#fafbf5",
  fields: [{ name: "Text", value: "Happy B-day!" }]
}
Cake.states = cakeStates

export default Cake

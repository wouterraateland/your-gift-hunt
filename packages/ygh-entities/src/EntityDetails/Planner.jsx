import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"
import plankStyles from "../plankStyles"
import Keyhole from "./Keyhole"

const Door = styled(Entity)`
  clip-path: polygon(
    0% 0%,
    0% 100%,
    50% 100%,
    50% 40%,
    35% 30%,
    50% 20%,
    65% 30%,
    50% 40%,
    50% 100%,
    100% 100%,
    100% 0%
  );
`

const Plank = styled(Entity)`
  ${plankStyles}
`
Plank.defaultProps = {
  ...Entity.defaultProps,
  width: 2,
  height: 16,
  color: "#584630"
}
const TopPlank = styled(Plank)`
  clip-path: polygon(0 0, 0 100%, 100% 80%, 100% 20%);
`

const BottomPlank = styled(Plank)`
  clip-path: polygon(0 20%, 0 80%, 100% 100%, 100% 0);
`

const Planner = forwardRef((props, ref) => {
  const isUnlocked = _.hasState("Unlocked")(props)

  return (
    <Door noVisual {...props}>
      <Plank left={1} />
      <Plank left={3} />
      <Plank left={5} />
      <Plank left={7} />
      <Plank left={9} />
      <TopPlank left={5} top={1} height={10} rotation={90} />
      <BottomPlank left={5} top={15} height={10} rotation={90} />
      <Keyhole left={9} top={9} isUnlocked={isUnlocked} ref={ref} />
    </Door>
  )
})
Planner.name = "Planner"
Planner.templateName = "Planner"
Planner.defaultProps = {
  ...Entity.defaultProps,
  width: 10,
  height: 16,
  color: "#754C3D"
}
Planner.states = ["One", "Two", "Three"]

export default Planner

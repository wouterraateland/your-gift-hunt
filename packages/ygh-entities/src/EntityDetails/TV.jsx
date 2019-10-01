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

const TV = forwardRef((props, ref) => {
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
TV.name = "TV"
TV.templateName = "TV"
TV.defaultProps = {
  ...Entity.defaultProps,
  width: 16,
  height: 10,
  color: "#3f3f3f"
}

export default TV

import { NODE_TYPES } from "data"
import React from "react"
import styled from "styled-components"

import InstanceTag from "../InstanceTag"
import ClickableStateTag from "./ClickableStateTag"

const Arrow = styled.span`
  margin: 0 0.5em;
  font-weight: bold;

  color: #f93;
`

const Transition = ({ withEntity, from, to }) =>
  from.type === NODE_TYPES.ENTRY ? (
    "Game starts"
  ) : (
    <>
      {withEntity && <InstanceTag {...from.instance} />}
      <ClickableStateTag {...from} />
      <Arrow>&rarr;</Arrow>
      <ClickableStateTag {...to} />
    </>
  )

export default Transition

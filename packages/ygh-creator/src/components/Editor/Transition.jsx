import { NODE_TYPES } from "data"
import React from "react"
import styled from "styled-components"

import NodeTag from "./NodeTag"

const Arrow = styled.span`
  margin: 0 0.5em;
  font-weight: bold;

  color: #f93;
`

const Transition = ({ from, to }) =>
  from.type === NODE_TYPES.ENTRY ? (
    "Game starts"
  ) : (
    <>
      <NodeTag node={from} showEntity />
      <Arrow>&rarr;</Arrow>
      <NodeTag node={to} />
    </>
  )

export default Transition

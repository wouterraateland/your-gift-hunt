import React from "react"
import styled from "styled-components"

import EntityTag from "../EntityTag"
import ClickableStateTag from "./ClickableStateTag"

const Arrow = styled.span`
  margin: 0 0.5em;
  font-weight: bold;

  color: #f93;
`

const Transition = ({ withEntity, from, to }) => (
  <>
    {withEntity && <EntityTag {...from.instance.entity} />}
    <ClickableStateTag {...from} />
    <Arrow>&rarr;</Arrow>
    <ClickableStateTag {...to} />
  </>
)

export default Transition

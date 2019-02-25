import React from "react"
import styled from "styled-components"

import * as Icon from "your-gift-hunt/icons"

const EntityTag = styled.span`
  display: inline-block;
  padding: 0.1em 0.5em;

  font-size: smaller;

  background-color: ${props => props.theme.color.accent};
`

export default ({ isItem, isObject, isTrigger, children }) => (
  <EntityTag>
    {isItem && <Icon.Item size={1} />}
    {isObject && <Icon.Object size={1} />}
    {isTrigger && <Icon.Trigger size={1} />}
    {!isItem && !isObject && !isTrigger && <Icon.Challenge size={1} />}
    {children}
  </EntityTag>
)

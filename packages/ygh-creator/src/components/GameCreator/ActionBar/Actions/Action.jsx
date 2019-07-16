import React, { forwardRef } from "react"
import styled from "styled-components"

import { ToolTip } from "ygh-ui"

const ActionContainer = styled.div`
  cursor: pointer;

  padding: 0.25em;
  width: 2em;
  flex-shrink: 0;
  border-radius: ${props => props.theme.borderRadius};

  &:hover {
    background-color: #fff1;
  }
`

const Action = forwardRef(({ title, icon: Icon, onAct }, ref) => {
  return (
    <ActionContainer onClick={onAct} ref={ref}>
      <ToolTip>{title}</ToolTip>
      <Icon size={1.5} />
    </ActionContainer>
  )
})

export default Action

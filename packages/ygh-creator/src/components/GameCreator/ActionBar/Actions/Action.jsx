import React, { forwardRef } from "react"
import styled from "styled-components"

import { ActionButton, ToolTip } from "ygh-ui"

const ActionContainer = styled.div`
  cursor: pointer;

  font-size: 1.5rem;

  flex-shrink: 0;
  border-radius: ${props => props.theme.borderRadius};
`

const Action = forwardRef(
  ({ title, icon: Icon, onAct, ...otherProps }, ref) => {
    return (
      <ActionContainer onClick={onAct} ref={ref}>
        <ActionButton {...otherProps}>
          <ToolTip>{title}</ToolTip>
          <Icon />
        </ActionButton>
      </ActionContainer>
    )
  }
)

export default Action

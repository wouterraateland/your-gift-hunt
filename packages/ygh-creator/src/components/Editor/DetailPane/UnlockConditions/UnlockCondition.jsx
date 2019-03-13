import { EDGE_TYPES } from "data"
import React from "react"
import { ActionButton } from "your-gift-hunt/ui"
import { Bin } from "your-gift-hunt/icons"

import styled from "styled-components"
import Transition from "components/Editor/Transition"

const UnlockConditionContainer = styled.div`
  display: block;
  margin-bottom: 0.5em;

  &::before {
    content: ${props =>
      props.type === EDGE_TYPES.ENTRY ? '"\u2022"' : '"\u2192"'};

    margin-right: 0.5em;

    font-weight: bold;

    color: #39f;
  }
`

const UnlockCondition = ({ data, isDeletable = true, onDeleteClick }) => (
  <UnlockConditionContainer type={data.from.type}>
    <Transition {...data} />
    {isDeletable && (
      <ActionButton color="error" onClick={onDeleteClick}>
        <Bin />
      </ActionButton>
    )}
  </UnlockConditionContainer>
)

export default UnlockCondition

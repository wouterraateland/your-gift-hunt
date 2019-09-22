import React from "react"
import { ActionButton } from "ygh-ui"
import { Bin } from "ygh-icons"

import styled from "styled-components"
import EntityTag from "components/GameCreator/ClickableEntityTag"
import Transition from "components/GameCreator/ClickableTransition"

const UnlockConditionContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-top: 0.5em;
  }
`

const Condition = styled.div`
  flex-grow: 1;
`

const Arrow = styled.span`
  width: 1rem;
  flex-shrink: 0;

  font-weight: bold;

  color: #39f;
`

const Actions = styled.div`
  margin-right: -0.25rem;
  flex-shrink: 0;
`

const UnlockCondition = ({
  entity,
  from,
  to,
  isDeletable = true,
  onDeleteClick
}) => (
  <UnlockConditionContainer>
    <Arrow>{from ? "\u2192" : "\u2022"}</Arrow>
    {from ? (
      <Condition>
        <EntityTag entity={entity} />(<Transition from={from} to={to} />)
      </Condition>
    ) : entity.container ? (
      "Entity accessible"
    ) : (
      "Game starts"
    )}
    <Actions>
      {isDeletable && (
        <ActionButton color="error" onClick={onDeleteClick}>
          <Bin />
        </ActionButton>
      )}
    </Actions>
  </UnlockConditionContainer>
)

export default UnlockCondition

import React from "react"
import { ActionButton } from "ygh-ui"
import { Bin } from "ygh-icons"

import styled from "styled-components"
import EntityTag from "components/GameCreator/ClickableEntityTag"
import Transition from "components/GameCreator/ClickableTransition"

const UnlockConditionContainer = styled.div`
  display: block;

  &:not(:first-child) {
    margin-top: 0.5em;
  }

  &::before {
    content: ${props => (props.type ? '"\u2192"' : '"\u2022"')};

    margin-right: 0.5em;

    font-weight: bold;

    color: #39f;
  }
`

const UnlockCondition = ({
  entity,
  from,
  to,
  isDeletable = true,
  onDeleteClick
}) => (
  <UnlockConditionContainer type={from}>
    {from ? (
      <EntityTag entity={entity}>
        {" "}
        <Transition from={from} to={to} />
      </EntityTag>
    ) : entity.container ? (
      "Entity accessible"
    ) : (
      "Game starts"
    )}
    {isDeletable && (
      <ActionButton color="error" onClick={onDeleteClick}>
        <Bin />
      </ActionButton>
    )}
  </UnlockConditionContainer>
)

export default UnlockCondition

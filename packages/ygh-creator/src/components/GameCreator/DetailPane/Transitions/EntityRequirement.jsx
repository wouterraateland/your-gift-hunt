import { EDGE_TYPES, ACTION_TYPES } from "data"
import React, { useState } from "react"
import styled from "styled-components"

import useEntityGraph from "hooks/useEntityGraph"
import useGameQueries from "hooks/useGameQueries"
import useGameMutations from "hooks/useGameMutations"

import { ActionButton, ToolTip } from "ygh-ui"
import Icons from "ygh-icons"
import EntityTag from "components/GameCreator/ClickableEntityTag"
import StateTag from "components/GameCreator/ClickableStateTag"
import ListItem from "./ListItem"
import ActionRequirementForm from "./ActionRequirementForm"

const Description = styled.span`
  display: inline-block;
  width: calc(100% - 3.25rem);
`

const Actions = styled.div`
  display: inline-block;
  margin-right: 0.25rem;
`

const EntityRequirement = ({ actionRequirement, ...props }) => {
  const {
    type,
    payload: {
      requiredEntity: { entityState }
    }
  } = actionRequirement

  const { nodes } = useEntityGraph()
  const { getStateById } = useGameQueries()
  const { deleteActionRequirement } = useGameMutations()

  const [isEditing, setEditing] = useState(false)

  const entity = nodes.find(
    node => node.state && node.state.id === entityState.id
  ).entity
  const state = getStateById(entityState.id)

  return isEditing ? (
    <ActionRequirementForm
      actionRequirement={actionRequirement}
      {...props}
      onClose={() => setEditing(false)}
    />
  ) : (
    <ListItem type={EDGE_TYPES.USE}>
      <Description>
        {type === ACTION_TYPES.USE && "Used on"} <EntityTag entity={entity} />(
        <StateTag state={state} />){" "}
        {type === ACTION_TYPES.TARGET_OF_USE && "is used on this"}
      </Description>
      <Actions>
        <ActionButton
          onClick={() => deleteActionRequirement(actionRequirement.id)}
          color="error"
        >
          <Icons.Bin />
          <ToolTip>Delete action requirement</ToolTip>
        </ActionButton>
        <ActionButton onClick={() => setEditing(true)} color="primary">
          <Icons.Pen />
          <ToolTip>Edit action requirement</ToolTip>
        </ActionButton>
      </Actions>
    </ListItem>
  )
}

export default EntityRequirement

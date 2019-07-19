import React, { useCallback } from "react"
import styled, { css } from "styled-components"
import { transparentize } from "polished"

import useGame from "hooks/useGame"
import useGameQueries from "hooks/useGameQueries"
import useInspector from "hooks/useInspector"
import useEditor from "hooks/useEditor"

import { ToolTip } from "ygh-ui"
import Entity from "components/GameCreator/EditorPane/Entity"
import Nodes from "components/GameCreator/EditorPane/Entity/Nodes"

const Outer = styled.div`
  cursor: pointer;
  position: relative;

  box-sizing: content-box;
  width: 100%;
  height: 100%;
  margin: -${props => props.theme.borderWidth};
  border: ${props => props.theme.borderWidth} dashed;
  border-radius: ${props => props.theme.borderRadius};

  background-color: #0001;

  ${props =>
    props.mayBeDeleted
      ? css`
          background-color: ${transparentize(0.9, props.theme.color.error)};
          border-color: ${props.theme.color.error};
        `
      : props.isFocused &&
        css`
          background-color: ${transparentize(0.9, props.theme.color.primary)};
          border-color: ${props.theme.color.primary};
        `}
`

const Name = styled.h3`
  margin: 0.35em 1.7em;
  line-height: 1em;
`

const StartContainerIndicator = styled.div`
  position: relative;

  display: inline-block;
  padding: 0.125em 0.5em;
  margin: 0.125em 0;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.medium};

  font-size: small;
  font-family: ${props => props.theme.font.copy};
  line-height: 1;

  background: ${props => props.theme.color.emphasis};
  color: #fff;
`

const ContainerEntity = ({ entity, ...props }) => {
  const { game } = useGame()
  const { getEntityById } = useGameQueries()
  const { inspectEntity, inspectedEntity, isOpen } = useInspector()
  const { upcomingAction, ACTION_TYPES } = useEditor()

  const onClick = useCallback(
    event => {
      event.stopPropagation()
      inspectEntity(entity.id)
    },
    [entity.id]
  )

  const isStartContainer =
    game.startContainer && game.startContainer.id === entity.id

  const mayBeDeleted =
    upcomingAction &&
    upcomingAction.type === ACTION_TYPES.DELETE_NODE &&
    entity.states.every(state =>
      upcomingAction.payload.dependentStates.includes(state.id)
    )

  return (
    <Outer
      {...props}
      onClick={onClick}
      isFocused={isOpen && inspectedEntity === entity.id}
      mayBeDeleted={mayBeDeleted}
    >
      <Nodes entity={entity} />
      <Name>
        {entity.name}{" "}
        {isStartContainer && (
          <StartContainerIndicator>
            <ToolTip>Player starts in this area</ToolTip>
            Start
          </StartContainerIndicator>
        )}
      </Name>
      {entity.containedEntities.map(containedEntity => (
        <Entity
          key={containedEntity.id}
          entity={getEntityById(containedEntity.id)}
        />
      ))}
    </Outer>
  )
}
export default ContainerEntity

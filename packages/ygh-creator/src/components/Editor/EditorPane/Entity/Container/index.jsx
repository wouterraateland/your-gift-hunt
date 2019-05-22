import React, { useCallback } from "react"
import styled from "styled-components"

import useGame from "hooks/useGame"
import useGameQueries from "hooks/useGameQueries"
import useInspector from "hooks/useInspector"

import { ToolTip } from "your-gift-hunt/ui"
import Entity from "components/Editor/EditorPane/Entity"
import Nodes from "components/Editor/EditorPane/Entity/Nodes"

const Outer = styled.div`
  cursor: pointer;
  position: relative;

  box-sizing: content-box;
  width: 100%;
  height: 100%;
  margin: -0.1em;
  border: 0.1em dashed;
  border-radius: ${props => props.theme.borderRadius};

  background-color: #0001;
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
  const { inspectEntity } = useInspector()

  const onClick = useCallback(
    event => {
      event.stopPropagation()
      inspectEntity(entity.id)
    },
    [entity.id]
  )

  const isStartContainer =
    game.startContainer && game.startContainer.id === entity.id

  return (
    <Outer {...props} onClick={onClick}>
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

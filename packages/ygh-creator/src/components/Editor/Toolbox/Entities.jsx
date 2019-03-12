import React, { useCallback, useContext, useEffect, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"
import InspectorContext from "contexts/Inspector"

import EntitiesContainer from "./EntitiesContainer"
import EntityEntry from "./EntityEntry"

const BackButton = styled.button`
  @media (min-width: 25em) {
    display: none;
  }

  cursor: pointer;

  padding: 0.5em;
  border: none;

  font-weight: bold;

  background: transparent;
  color: #fff;

  &:hover {
    background: #0004;
  }
`

const getEntitiesFilter = type => {
  switch (type) {
    case "challenge":
      return ({ isObject, isItem, isTrigger }) =>
        !isObject && !isItem && !isTrigger
    case "object":
      return ({ isObject }) => isObject
    case "trigger":
      return ({ name, isTrigger }) => isTrigger && name !== "Start trigger"
    default:
      return () => false
  }
}

const Entities = ({ isVisible, selectedType, onBackClick }) => {
  const {
    game: { instances },
    createEntityInstance
  } = useContext(GameContext)
  const { inspectNode } = useContext(InspectorContext)
  const { entities } = useContext(EntitiesContext)
  const visibleEntities = entities.filter(getEntitiesFilter(selectedType))
  const [isEntityInstanceCreated, setEntityInstanceCreated] = useState(false)

  const [expandedEntity, setExpandedEntity] = useState(null)

  const onEntityClick = useCallback(
    async entityId => {
      await createEntityInstance(entityId)
      onBackClick()
      setEntityInstanceCreated(true)
    },
    [createEntityInstance]
  )

  const onEntityInfoClick = useCallback(
    entityId =>
      setExpandedEntity(expandedEntity =>
        expandedEntity === entityId ? null : entityId
      ),
    []
  )

  useEffect(
    () => {
      setExpandedEntity(null)
    },
    [isVisible, selectedType]
  )

  useEffect(
    () => {
      if (isEntityInstanceCreated) {
        inspectNode(instances[instances.length - 1].states[0].id)
        setEntityInstanceCreated(false)
      }
    },
    [isEntityInstanceCreated]
  )

  return (
    <EntitiesContainer isVisible={isVisible}>
      <BackButton onClick={onBackClick}>&larr; Back</BackButton>
      {visibleEntities.map(entity => (
        <EntityEntry
          key={entity.id}
          entity={entity}
          isAvailable={
            selectedType !== "object" ||
            !instances.some(instance => instance.entity.id === entity.id)
          }
          isPro={entity.name === "Plant pot"}
          isUpcoming={false} //selectedType === "trigger"}
          isExpanded={expandedEntity === entity.id}
          onClick={() => onEntityClick(entity.id)}
          onInfoClick={event => {
            event.stopPropagation()
            onEntityInfoClick(entity.id)
          }}
        />
      ))}
    </EntitiesContainer>
  )
}

export default Entities

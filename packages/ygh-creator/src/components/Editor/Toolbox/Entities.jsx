import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import useGame from "hooks/useGame"
import useTemplates from "hooks/useTemplates"
import useInspector from "hooks/useInspector"

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
    case "item":
      return ({ isItem, states }) =>
        isItem &&
        states.every(({ outgoingTransitions }) =>
          outgoingTransitions.every(({ to }) => to)
        )
    case "trigger":
      return ({ name, isTrigger }) => isTrigger && name !== "Start trigger"
    default:
      return () => false
  }
}

const Entities = ({ isVisible, selectedType, onBackClick }) => {
  const {
    game: { entities },
    createEntity
  } = useGame()
  const { inspectNode } = useInspector()
  const { entityTemplates } = useTemplates()
  const visibleEntityTemplates = entityTemplates.filter(
    getEntitiesFilter(selectedType)
  )
  const [isEntityCreated, setEntityCreated] = useState(false)

  const [expandedEntityTemplate, setExpandedEntity] = useState(null)

  const onEntityTemplateClick = useCallback(
    async entityTemplateId => {
      await createEntity(entityTemplateId)
      onBackClick()
      setEntityCreated(true)
    },
    [createEntity]
  )

  const onEntityTemplateInfoClick = useCallback(
    entityTemplateId =>
      setExpandedEntity(expandedEntityTemplate =>
        expandedEntityTemplate === entityTemplateId ? null : entityTemplateId
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
      if (isEntityCreated) {
        inspectNode(entities[entities.length - 1].states[0].id)
        setEntityCreated(false)
      }
    },
    [isEntityCreated]
  )

  return (
    <EntitiesContainer isVisible={isVisible}>
      <BackButton onClick={onBackClick}>&larr; Back</BackButton>
      {visibleEntityTemplates.map(entityTemplate => (
        <EntityEntry
          key={entityTemplate.id}
          entity={entityTemplate}
          isAvailable={
            !["object", "item"].includes(selectedType) ||
            !entities.some(entity => entity.template.id === entityTemplate.id)
          }
          isPro={entityTemplate.name === "Plant pot"}
          isUpcoming={false} //selectedType === "trigger"}
          isExpanded={expandedEntityTemplate === entityTemplate.id}
          onClick={() => onEntityTemplateClick(entityTemplate.id)}
          onInfoClick={event => {
            event.stopPropagation()
            onEntityTemplateInfoClick(entityTemplate.id)
          }}
        />
      ))}
    </EntitiesContainer>
  )
}

export default Entities

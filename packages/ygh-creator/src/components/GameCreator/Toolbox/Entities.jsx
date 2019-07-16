import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import useEntities from "hooks/useEntities"
import useGameTemplates from "hooks/useGameTemplates"
import useInspector from "hooks/useInspector"
import useGameMutations from "hooks/useGameMutations"
import { usePanZoomEditorContext } from "hooks/usePanZoomEditor"
import { usePanZoomGraphicContext } from "hooks/usePanZoomGraphic"

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
      return ({ isObject, isItem, isTrigger, isContainer }) =>
        !isObject && !isItem && !isTrigger && !isContainer
    case "container":
      return ({ isContainer }) => isContainer
    case "object":
      return ({ isContainer, isObject, isItem, states }) =>
        !isContainer &&
        (isObject ||
          (isItem &&
            states.every(({ outgoingTransitions }) =>
              outgoingTransitions.every(({ to }) => to)
            )))
    case "trigger":
      return ({ name, isTrigger }) => isTrigger && name !== "Start trigger"
    default:
      return () => false
  }
}

const Entities = ({ isVisible, selectedType, onBackClick }) => {
  const { entities } = useEntities()
  const { createEntity } = useGameMutations()
  const { inspectState } = useInspector()
  const { entityTemplates } = useGameTemplates()
  const panZoomEditor = usePanZoomEditorContext()
  const panZoomGraphic = usePanZoomGraphicContext()

  const visibleEntityTemplates = entityTemplates.filter(
    getEntitiesFilter(selectedType)
  )
  const [isEntityCreated, setEntityCreated] = useState(false)

  const [expandedEntityTemplate, setExpandedEntity] = useState(null)

  const onEntityTemplateClick = useCallback(
    async entityTemplateId => {
      const getEditorCenter = ({ center }) => ({
        left: Math.round(center.left / 32),
        top: Math.round(center.top / 32)
      })

      const getGraphicCenter = ({ center }) => ({
        left: center.left / 16,
        top: center.top / 16
      })

      await createEntity(
        entityTemplateId,
        getEditorCenter(panZoomEditor),
        getGraphicCenter(panZoomGraphic)
      )
      onBackClick()
      setEntityCreated(true)
    },
    [createEntity, panZoomEditor, panZoomGraphic]
  )

  const onEntityTemplateInfoClick = useCallback(
    entityTemplateId =>
      setExpandedEntity(expandedEntityTemplate =>
        expandedEntityTemplate === entityTemplateId ? null : entityTemplateId
      ),
    []
  )

  useEffect(() => {
    setExpandedEntity(null)
  }, [isVisible, selectedType])

  useEffect(() => {
    if (isEntityCreated) {
      inspectState(entities[entities.length - 1].states[0].id)
      setEntityCreated(false)
    }
  }, [isEntityCreated])

  return (
    <EntitiesContainer isVisible={isVisible}>
      <BackButton onClick={onBackClick}>&larr; Back</BackButton>
      {visibleEntityTemplates.map(entityTemplate => (
        <EntityEntry
          key={entityTemplate.id}
          entity={entityTemplate}
          isAvailable={
            !["object", "item"].includes(selectedType) ||
            !entities.some(
              entity =>
                entity.template && entity.template.id === entityTemplate.id
            )
          }
          isPro={false}
          isUpcoming={false}
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

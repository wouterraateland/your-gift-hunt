import React, { useCallback, useEffect, useState } from "react"

import useGame from "hooks/useGame"
import useGameTemplates from "hooks/useGameTemplates"
import useGameMutations from "hooks/useGameMutations"
import { usePanZoomEditorContext } from "hooks/usePanZoomEditor"
import { usePanZoomGraphicContext } from "hooks/usePanZoomGraphic"

import { Accordion } from "ygh-ui"
import TemplateSet from "./TemplateSet"

const matchesFilter = (templateName, filter) =>
  templateName.toLowerCase().includes(filter.toLowerCase())

const TemplateSets = ({ filter }) => {
  const { game } = useGame()
  const { entityTemplates } = useGameTemplates()
  const { createEntity } = useGameMutations()
  const panZoomEditor = usePanZoomEditorContext()
  const panZoomGraphic = usePanZoomGraphicContext()

  const visibleEntityTemplates = entityTemplates.filter(
    ({ isPlaceable, isContainer }) => isPlaceable || !isContainer
  )

  const [state, setState] = useState(
    JSON.parse(window.localStorage.getItem("packPreferences"))
  )

  useEffect(() => {
    window.localStorage.setItem("packPreferences", JSON.stringify(state))
  }, [state])

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
    },
    [createEntity, panZoomEditor, panZoomGraphic]
  )

  return (
    <Accordion
      state={state}
      setState={setState}
      children={[
        <Accordion.Section key={0} title="Default">
          <TemplateSet
            onEntityTemplateClick={onEntityTemplateClick}
            templateSet={{
              name: "Default",
              description: "Entities usable in all games",
              entityTemplates: visibleEntityTemplates.filter(
                entityTemplate =>
                  !entityTemplate.set &&
                  matchesFilter(entityTemplate.name, filter)
              )
            }}
            filter={filter}
          />
        </Accordion.Section>,
        ...game.entityTemplateSets.map(set => (
          <Accordion.Section key={set.id} title={set.name}>
            <TemplateSet
              onEntityTemplateClick={onEntityTemplateClick}
              templateSet={{
                ...set,
                entityTemplates: visibleEntityTemplates.filter(
                  entityTemplate =>
                    entityTemplate.set &&
                    entityTemplate.set.id === set.id &&
                    matchesFilter(entityTemplate.name, filter)
                )
              }}
              filter={filter}
            />
          </Accordion.Section>
        ))
      ]}
    />
  )
}

export default TemplateSets

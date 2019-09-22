import React, { useState, useEffect } from "react"

import useGame from "hooks/useGame"
import useGameTemplates from "hooks/useGameTemplates"

import { Accordion } from "ygh-ui"
import TemplateSet from "./TemplateSet"

const TemplateSets = ({ filter }) => {
  const { game } = useGame()
  const { entityTemplates } = useGameTemplates()

  const creatableEntityTemplates = entityTemplates.filter(
    ({ isPlaceable, isContainer }) => isPlaceable || !isContainer
  )

  const [state, setState] = useState(
    JSON.parse(window.localStorage.getItem("packPreferences"))
  )

  useEffect(() => {
    window.localStorage.setItem("packPreferences", JSON.stringify(state))
  }, [state])

  return (
    <Accordion
      state={state}
      setState={setState}
      children={[
        <Accordion.Section key={0} title="Default">
          <TemplateSet
            templateSet={{
              name: "Default",
              description: "Entities usable in all games",
              entityTemplates: creatableEntityTemplates.filter(
                entityTemplate => !entityTemplate.set
              )
            }}
            filter={filter}
          />
        </Accordion.Section>,
        ...game.entityTemplateSets.map(set => (
          <Accordion.Section key={set.id} title={set.name}>
            <TemplateSet
              templateSet={{
                ...set,
                entityTemplates: creatableEntityTemplates.filter(
                  entityTemplate =>
                    entityTemplate.set && entityTemplate.set.id === set.id
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

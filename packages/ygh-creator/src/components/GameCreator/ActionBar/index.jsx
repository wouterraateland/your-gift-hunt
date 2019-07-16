import React from "react"

import useEntities from "hooks/useEntities"
import useEntityFocus from "hooks/useEntityFocus"

import Container from "./Container"
import Section from "./Section"
import Actions from "./Actions"

const ActionBar = () => {
  const { getEntityById } = useEntities()
  const { focusedEntityId } = useEntityFocus()

  const entity = getEntityById(focusedEntityId)

  return entity ? (
    <Container entity={entity}>
      <Section>
        <Actions.Inspect entity={entity} />
      </Section>
      <Section>
        <Actions.BringForward entity={entity} />
        <Actions.SendBackward entity={entity} />
      </Section>
      <Section>
        <Actions.Delete entity={entity} />
      </Section>
      <Section>
        <Actions.Blur entity={entity} />
      </Section>
    </Container>
  ) : null
}

export default ActionBar

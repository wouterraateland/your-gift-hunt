import React from "react"

import useEntities from "hooks/useEntities"
import useEntityPositionUpdates from "hooks/useEntityPositionUpdates"

import Container from "./Container"
import Entity from "./Entity"

const GraphicPane = () => {
  const { rootEntities } = useEntities()
  useEntityPositionUpdates()

  return (
    <Container>
      {rootEntities.map(entity => (
        <Entity key={entity.id} entity={entity} />
      ))}
    </Container>
  )
}

export default GraphicPane

import React from "react"

import useEntities from "hooks/useEntities"

import Container from "./Container"
import Entity from "./Entity"

const GraphicPane = () => {
  const { rootEntities } = useEntities()

  return (
    <Container>
      {rootEntities.map(entity => (
        <Entity key={entity.id} entity={entity} />
      ))}
    </Container>
  )
}

export default GraphicPane

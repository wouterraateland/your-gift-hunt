import React from "react"

import useEntities from "hooks/useEntities"
import useEntityGraph from "hooks/useEntityGraph"

import Container from "./Container"
import Entity from "./Entity"
import Edges from "./Edges"

const EditorPane = () => {
  const { rootEntities } = useEntities()
  const { edges } = useEntityGraph()

  return (
    <Container>
      {rootEntities.map(entity => (
        <Entity key={entity.id} entity={entity} />
      ))}
      <Edges edges={edges} />
    </Container>
  )
}

export default EditorPane

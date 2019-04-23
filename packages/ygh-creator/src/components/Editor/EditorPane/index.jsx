import React from "react"

import useGame from "hooks/useGame"

import Container from "./Container"
import Node from "./Node"
import Edge from "./Edge"

const EditorPane = () => {
  const { nodes, edges } = useGame()

  return (
    <Container>
      {nodes.map(node => (
        <Node key={node.id} {...node} />
      ))}
      {edges.map(edge => (
        <Edge key={edge.id} {...edge} />
      ))}
    </Container>
  )
}

export default EditorPane

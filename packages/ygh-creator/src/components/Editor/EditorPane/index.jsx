import React, { useContext } from "react"

import GameContext from "contexts/Game"

import Container from "./Container"
import Node from "./Node"
import Edge from "./Edge"

const EditorPane = ({ onNodeClick }) => {
  const { getNodePosition, nodes, edges } = useContext(GameContext)

  return (
    <Container>
      {nodes.map(node => (
        <Node
          key={node.id}
          position={getNodePosition(node.id)}
          onNodeClick={onNodeClick}
          {...node}
        />
      ))}
      {edges.map(edge => (
        <Edge key={edge.id} getNodePosition={getNodePosition} {...edge} />
      ))}
    </Container>
  )
}

export default EditorPane

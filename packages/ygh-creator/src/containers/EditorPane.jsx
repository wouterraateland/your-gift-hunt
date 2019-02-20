import React, { useContext } from "react"
import _ from "utils"

import GameContext from "contexts/Game"

import EditorPaneBackground from "components/EditorPane"
import InstanceCard from "components/InstanceCard"
import TransitionArrow from "components/TransitionArrow"

const EditorPane = ({ onNodeClick = _.noop }) => {
  const { getNodePosition, nodes, edges } = useContext(GameContext)

  return (
    <EditorPaneBackground>
      {nodes.map(({ id, instance, state }) => (
        <InstanceCard
          key={id}
          position={getNodePosition(id)}
          instance={instance}
          state={state.state.name}
          onClick={() => onNodeClick(id)}
        />
      ))}
      {edges.map(({ id, type, from, to }) => {
        const fromPosition = getNodePosition(from)
        const toPosition = getNodePosition(to)
        return (
          <TransitionArrow
            key={id}
            x1={fromPosition.left + 96}
            y1={fromPosition.top + 96}
            x2={toPosition.left + 96}
            y2={toPosition.top}
            type={type}
          />
        )
      })}
    </EditorPaneBackground>
  )
}

export default EditorPane

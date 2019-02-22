import React, { useContext } from "react"
import _ from "utils"

import GameContext from "contexts/Game"

import EditorPaneBackground from "components/EditorPane"
import InstanceCard from "components/InstanceCard"
import TransitionArrow from "components/TransitionArrow"
import EntryNode from "components/EntryNode"
import ExitNode from "components/ExitNode"

const Node = ({
  id,
  instance,
  position,
  state,
  type,
  onNodeClick = _.noop
}) => {
  switch (type) {
    case "entry":
      return <EntryNode position={position} />
    case "state":
      return (
        <InstanceCard
          key={id}
          position={position}
          instance={instance}
          state={state.state.name}
          onClick={() => onNodeClick(id)}
        />
      )
    case "exit":
      return <ExitNode position={position} />
    default:
      return null
  }
}

const EditorPane = ({ onNodeClick }) => {
  const { getNodePosition, nodes, edges } = useContext(GameContext)

  return (
    <EditorPaneBackground>
      {nodes.map(node => (
        <Node
          key={node.id}
          position={getNodePosition(node.id)}
          onNodeClick={onNodeClick}
          {...node}
        />
      ))}
      {edges.map(({ id, type, from, to, unlocks }) => {
        const fromPosition = getNodePosition(from)
        const toPosition = to
          ? getNodePosition(to)
          : { x: fromPosition.x, y: fromPosition.y + 32 }
        const unlocksPosition = getNodePosition(unlocks)

        return type === TransitionArrow.UNLOCK_TRANSITION ? (
          <TransitionArrow
            key={id}
            x1={(fromPosition.left + 96 + toPosition.left + 96) / 2}
            y1={(fromPosition.top + 96 + toPosition.top) / 2}
            x2={unlocksPosition.left + 96}
            y2={unlocksPosition.top}
            type={type}
          />
        ) : (
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

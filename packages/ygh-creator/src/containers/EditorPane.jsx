import React from "react"
import _ from "utils"

import EditorPaneBackground from "components/EditorPane"
import InstanceCard from "components/InstanceCard"
import TransitionArrow from "components/TransitionArrow"

const positions = Array(40)
  .fill(0)
  .map(() => ({
    left: Math.floor(20 * Math.random()) * 32 + 16,
    top: Math.floor(20 * Math.random()) * 32 + 16
  }))

const EditorPane = ({ hunt, onCardClick = _.noop }) => {
  let i = 0
  const nodes = hunt.instances.flatMap(({ states, ...instance }) =>
    states.map(state => ({
      ...instance,
      state: state.state.name,
      stateObject: state,
      position: positions[i++ % positions.length]
    }))
  )

  const transformTransitions = nodes.flatMap(node =>
    node.stateObject.state.incomingTransitions.map(({ from }) => ({
      from: nodes.find(({ stateObject: { state } }) => state.id === from.id),
      to: node,
      type: TransitionArrow.TRANSFORM_TRANSITION
    }))
  )
  // .filter(({ from, to }) => from && to && from.position && to.position)

  const unlockTransitions = nodes
    .filter(({ stateObject: { unlockedBy } }) => unlockedBy)
    .map(node => ({
      from: nodes.find(
        ({ stateObject }) =>
          stateObject.id === node.stateObject.unlockedBy.from.id
      ),
      to: node,
      type: TransitionArrow.UNLOCK_TRANSITION
    }))

  const transitions = transformTransitions.concat(unlockTransitions)

  return (
    <EditorPaneBackground>
      {nodes.map(({ position, ...instance }) => (
        <InstanceCard
          key={[instance.id, instance.state]}
          instance={instance}
          onClick={() => onCardClick(instance.id)}
          position={position}
        />
      ))}
      {transitions.map(({ type, from, to }) => (
        <TransitionArrow
          key={[from.id, from.state, to.id, to.state]}
          x1={from.position.left + 96}
          y1={from.position.top + 96}
          x2={to.position.left + 96}
          y2={to.position.top}
          type={type}
        />
      ))}
    </EditorPaneBackground>
  )
}

export default EditorPane

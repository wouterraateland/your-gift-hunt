import React from "react"
import _ from "utils"

import EditorPaneBackground from "components/EditorPane"
import InstanceCard from "components/InstanceCard"

const EditorPane = ({ hunt, onCardClick = _.noop }) => {
  const nodes = hunt.instances.flatMap(({ states, ...instance }) =>
    states.map(state => ({
      ...instance,
      state: state.state.name
    }))
  )
  return (
    <EditorPaneBackground>
      {nodes.map(instance => (
        <InstanceCard
          key={[instance.id, instance.state]}
          instance={instance}
          onClick={() => onCardClick(instance.id)}
        />
      ))}
    </EditorPaneBackground>
  )
}

export default EditorPane

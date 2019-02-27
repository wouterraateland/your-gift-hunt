import React, { Fragment, useContext } from "react"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"

import { Paper } from "your-gift-hunt/ui"
import ClickableStateTag from "./ClickableStateTag"

const StateTagList = ({ nodes, connector }) =>
  nodes.map((node, i) => (
    <Fragment key={i}>
      {i !== 0 && connector}
      <ClickableStateTag {...node} />
    </Fragment>
  ))

const PreviousStates = ({ node }) => {
  const { getNodeByInstanceAndState } = useContext(GameContext)
  const { getEntityStateById } = useContext(EntitiesContext)

  const entityState = getEntityStateById(node.state.state.id)
  const prevNodes = entityState.incomingTransitions.map(({ from }) =>
    getNodeByInstanceAndState(node.instance, from)
  )

  return prevNodes.length ? (
    <Paper>
      <Paper.Section>
        <Paper.Title size={3}>
          Previous state{prevNodes.length > 1 && "s"}
        </Paper.Title>
        <StateTagList nodes={prevNodes} connector={" or "} />
      </Paper.Section>
    </Paper>
  ) : null
}

export default PreviousStates

import React, { Fragment, useContext, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"

import useAsync from "hooks/useAsync"

import { Paper, Button, Message } from "your-gift-hunt/ui"
import Options from "./Options"
import ClickableStateTag from "./ClickableStateTag"
import StateTag from "../StateTag"

const Em = styled.em`
  display: block;
  margin-bottom: 0.5em;

  opacity: 0.5;
`

const StateTagList = ({ nodes, connector }) =>
  nodes.length ? (
    nodes.map((node, i) => (
      <Fragment key={i}>
        {i !== 0 && connector}
        <ClickableStateTag {...node} />
      </Fragment>
    ))
  ) : (
    <Em>None</Em>
  )

const EditablePrevStates = ({ node, prevNodes, prevStates }) => {
  const { addPreviousState } = useContext(GameContext)
  const [{ isLoading, error }, runAsync] = useAsync()
  const [optionsVisible, setOptionsVisibility] = useState(false)

  const options = prevStates.filter(({ id }) =>
    prevNodes.every(node => node.state.state.id !== id)
  )
  const onOptionClick = runAsync(stateId => addPreviousState(stateId, node.id))

  const onOptionsClose = () => setOptionsVisibility(false)
  const onAddButtonClick = () => setOptionsVisibility(true)

  return (
    <>
      <Options
        closeOnClick
        components={{
          Option: ({ data }) => <StateTag>{data.name}</StateTag>
        }}
        options={options}
        onClose={onOptionsClose}
        onOptionClick={onOptionClick}
        isVisible={optionsVisible}
      />
      <Button
        disabled={isLoading}
        onClick={onAddButtonClick}
        size="small"
        importance="primary"
        color="accent"
      >
        + Add previous state
      </Button>
      {error && <Message.Error>{error.message}</Message.Error>}
    </>
  )
}

const PreviousStates = ({ node }) => {
  const { getNodeById } = useContext(GameContext)
  const { getEntityStateById } = useContext(EntitiesContext)

  const prevNodes = node.state.incomingTransitions.map(({ from }) =>
    getNodeById(from.id)
  )

  const entityState = getEntityStateById(node.state.state.id)
  const prevStates = entityState.incomingTransitions.map(({ from }) =>
    getEntityStateById(from.id)
  )

  return prevStates.length ? (
    <Paper>
      <Paper.Section>
        <Paper.Title size={3}>
          Previous state{prevNodes.length > 1 && "s"}
        </Paper.Title>
        <StateTagList nodes={prevNodes} connector={" or "} />
        {prevNodes.length < prevStates.length && (
          <EditablePrevStates
            node={node}
            prevNodes={prevNodes}
            prevStates={prevStates}
          />
        )}
      </Paper.Section>
    </Paper>
  ) : null
}

export default PreviousStates

import React, { Fragment, useContext, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"

import useAsync from "hooks/useAsync"

import { Button, Message, Options } from "your-gift-hunt/ui"
import NodeTag from "components/Editor/NodeTag"
import StateTag from "components/Editor/StateTag"
import Section from "components/Editor/DetailPane/Section"

const Em = styled.em`
  opacity: 0.5;
`

const VSpace = styled.div`
  margin-bottom: 0.5em;
`

const StateTagList = ({ nodes, connector }) =>
  nodes.length ? (
    nodes.map((node, i) => (
      <Fragment key={i}>
        {i !== 0 && connector}
        <NodeTag node={node} />
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

  const hasUnlocks = node.state.unlockedBy.length > 0

  return (
    <>
      <VSpace />
      <Options
        closeOnClick
        components={{
          Option: ({ data }) => <StateTag name={data.name} />
        }}
        options={options}
        onClose={onOptionsClose}
        onOptionClick={onOptionClick}
        isVisible={optionsVisible}
      />
      <Button
        disabled={isLoading || hasUnlocks}
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
    <Section title="Previous states">
      <StateTagList nodes={prevNodes} connector={" or "} />
      {prevNodes.length < prevStates.length && (
        <EditablePrevStates
          node={node}
          prevNodes={prevNodes}
          prevStates={prevStates}
        />
      )}
    </Section>
  ) : null
}

export default PreviousStates

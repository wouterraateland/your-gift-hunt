import { EDGE_TYPES } from "data"
import React from "react"
import styled from "styled-components"

import useEntityGraph from "hooks/useEntityGraph"

import EntryState from "components/Primitives/EntryState"
import ExitState from "components/Primitives/ExitState"
import StateCard from "./StateCard"

const SeparateEntryState = styled(EntryState)`
  margin: 0 auto 2.5em;
`

const InherentEntryState = styled(EntryState)`
  position: relative;
  z-index: 1;

  width: 0.5em;
  height: 0.5em;
  margin: 0 0.25em -2.75em;
`

const StyledExitState = styled(ExitState)`
  margin: 2em auto 0;
`

const States = ({ entity }) => {
  const { getEntryNode, getStateNodes, getExitNode, edges } = useEntityGraph()

  const unlockEdge = edges.find(
    ({ type, unlocks }) =>
      type === EDGE_TYPES.UNLOCK &&
      entity.states.some(({ id }) => id === unlocks)
  )

  const entryNode = getEntryNode(entity.id)
  const stateNodes = getStateNodes(entity.id)
  const exitNode = getExitNode(entity.id)

  return (
    <>
      {entryNode ? (
        <SeparateEntryState />
      ) : unlockEdge ? null : (
        <InherentEntryState />
      )}
      {stateNodes.map(({ id, state }) => (
        <StateCard key={id} state={state} />
      ))}
      {exitNode && <StyledExitState />}
    </>
  )
}

export default States

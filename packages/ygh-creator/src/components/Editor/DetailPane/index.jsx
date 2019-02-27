import React, { forwardRef, useContext } from "react"

import GameContext from "contexts/Game"
import InspectorContext from "contexts/Inspector"

import Container from "./Container"
import InstancePreview from "./InstancePreview"
import Meta from "./Meta"
import Fields from "./Fields"
import PreviousStates from "./PreviousStates"
import UnlockConditions from "./UnlockConditions"
import OutgoingTransitions from "./OutgoingTransitions"

import CloseButton from "./CloseButton"

const DetailPane = forwardRef((_, ref) => {
  const { isOpen, nodeId } = useContext(InspectorContext)
  const { nodes } = useContext(GameContext)

  const node = nodes.find(({ id }) => nodeId === id)

  return (
    <Container isOpen={isOpen} ref={ref}>
      {!!node && (
        <>
          <InstancePreview node={node} />
          <Meta node={node} />
          <Fields node={node} />
          <PreviousStates node={node} />
          <UnlockConditions node={node} />
          <OutgoingTransitions node={node} />
        </>
      )}
      <CloseButton />
    </Container>
  )
})

export default DetailPane

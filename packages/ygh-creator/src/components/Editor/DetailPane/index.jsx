import React, { forwardRef, useContext, useEffect } from "react"

import GameContext from "contexts/Game"
import InspectorContext from "contexts/Inspector"

import Container from "./Container"
import InstancePreview from "./InstancePreview"
import Meta from "./Meta"
import Fields from "./Fields"
import PreviousStates from "./PreviousStates"
import UnlockConditions from "./UnlockConditions"
import OutgoingTransitions from "./OutgoingTransitions"
import Delete from "./Delete"

import CloseButton from "./CloseButton"

const DetailPane = forwardRef((_, ref) => {
  const { isOpen, nodeId } = useContext(InspectorContext)
  const { getNodeById } = useContext(GameContext)

  const node = getNodeById(nodeId)

  useEffect(
    () => {
      if (ref.current) {
        ref.current.scrollTo(0, 0)
      }
    },
    [isOpen, nodeId]
  )

  return (
    <Container
      isOpen={isOpen}
      ref={ref}
      hasPreview={
        !!node && (node.instance.entity.isObject || node.instance.entity.isItem)
      }
    >
      {!!node && (
        <>
          <InstancePreview node={node} isOpen={isOpen} />
          <Meta node={node} isOpen={isOpen} />
          <Fields node={node} isOpen={isOpen} />
          <PreviousStates node={node} isOpen={isOpen} />
          <UnlockConditions node={node} isOpen={isOpen} />
          <OutgoingTransitions node={node} isOpen={isOpen} />
          <Delete node={node} isOpen={isOpen} />
        </>
      )}
      <CloseButton />
    </Container>
  )
})

export default DetailPane

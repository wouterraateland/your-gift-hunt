import React, { forwardRef, useContext } from "react"

import GameContext from "contexts/Game"
import InspectorContext from "contexts/Inspector"

import Container from "./Container"
import InstancePreview from "./InstancePreview"
import Body from "./Body"
import Meta from "./Meta"
import Fields from "./Fields"
import Relations from "./Relations"

const DetailPane = forwardRef((_, ref) => {
  const { isOpen, nodeId } = useContext(InspectorContext)
  const { nodes } = useContext(GameContext)

  const node = nodes.find(({ id }) => nodeId === id)

  return (
    <Container isOpen={isOpen} ref={ref}>
      {!!node && (
        <>
          <InstancePreview node={node} />
          <Body>
            <Meta node={node} />
            <Fields node={node} />
            <Relations node={node} />
          </Body>
        </>
      )}
    </Container>
  )
})

export default DetailPane

import React, { forwardRef, useContext } from "react"

import GameContext from "contexts/Game"

import DetailPaneContainer from "./Container"
import InstancePreview from "./InstancePreview"
import DetailPaneBody from "./Body"

const DetailPane = forwardRef(({ open, nodeId }, ref) => {
  const { nodes } = useContext(GameContext)
  const node = nodes.find(({ id }) => nodeId === id)

  return (
    <DetailPaneContainer open={open} ref={ref}>
      {!!node && (
        <>
          <InstancePreview instance={node.instance} />
          <DetailPaneBody instance={node.instance} />
        </>
      )}
    </DetailPaneContainer>
  )
})

export default DetailPane

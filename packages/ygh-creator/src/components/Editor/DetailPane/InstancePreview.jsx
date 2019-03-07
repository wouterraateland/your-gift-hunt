import React from "react"
import styled from "styled-components"

import EntityInstancePreview from "../EntityInstancePreview"

const EntityInstancePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 8em;
  margin-bottom: 1em;
`

const InstancePreview = ({ node }) => {
  const {
    instance: { entity }
  } = node
  const state = node.state ? node.state.state.name : null

  return entity.isItem || entity.isObject ? (
    <EntityInstancePreviewContainer>
      <EntityInstancePreview
        entity={entity}
        state={state}
        maxWidth={19}
        maxHeight={6}
      />
    </EntityInstancePreviewContainer>
  ) : null
}

export default InstancePreview

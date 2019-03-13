import React from "react"

import EntityInstancePreview from "components/Editor/EntityInstancePreview"

import PreviewContainer from "./Container"

const InstancePreview = ({ node }) => {
  const {
    instance: { entity }
  } = node
  const state = node.state ? node.state.state.name : null

  return entity.isItem || entity.isObject ? (
    <PreviewContainer>
      <EntityInstancePreview
        entity={entity}
        state={state}
        maxWidth={19}
        maxHeight={6}
      />
    </PreviewContainer>
  ) : null
}

export default InstancePreview

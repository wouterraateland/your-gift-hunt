import React from "react"

import EntityPreview from "components/Editor/EntityPreview"

import PreviewContainer from "./Container"

const Preview = ({ node }) => {
  const { entity } = node
  const state = node.state ? node.state.name : null

  return entity.isItem || entity.isObject ? (
    <PreviewContainer>
      <EntityPreview
        entity={entity}
        state={state}
        maxWidth={19}
        maxHeight={6}
      />
    </PreviewContainer>
  ) : null
}

export default Preview

import React from "react"

import EntityPreview from "components/Editor/EntityPreview"

import PreviewContainer from "./Container"

const Preview = ({ entity, state }) =>
  entity.isItem || entity.isObject ? (
    <PreviewContainer>
      <EntityPreview
        entity={entity.template}
        state={state ? state.name : null}
        maxWidth={19}
        maxHeight={6}
      />
    </PreviewContainer>
  ) : null

export default Preview

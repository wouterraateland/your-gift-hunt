import React from "react"
import styled from "styled-components"

import GenericItem from "your-gift-hunt/items"
import GenericObject from "your-gift-hunt/objects"

const InstancePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 10em;

  background: #0001;
`

const InstancePreview = ({ node }) => {
  const { instance } = node
  const { entity } = instance
  const state = node.state ? node.state.state.name : null
  return entity.isItem || entity.isObject ? (
    <InstancePreviewContainer>
      {entity.isItem && <GenericItem {...instance} state={state} />}
      {entity.isObject && <GenericObject {...instance} state={state} />}
    </InstancePreviewContainer>
  ) : null
}

export default InstancePreview

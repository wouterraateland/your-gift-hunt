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

const InstancePreview = ({ instance }) => {
  const { entity } = instance
  return entity.isItem || entity.isObject ? (
    <InstancePreviewContainer>
      {entity.isItem && <GenericItem {...instance} />}
      {entity.isObject && <GenericObject {...instance} />}
    </InstancePreviewContainer>
  ) : null
}

export default InstancePreview

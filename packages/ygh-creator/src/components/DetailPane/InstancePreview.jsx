import React from "react"
import styled from "styled-components"

import GenericItem from "your-gift-hunt/items"
import GenericObject, { getObjectComponent } from "your-gift-hunt/objects"

const InstancePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 10em;

  background: #0001;
`

const InstancePreview = ({ instance }) => {
  const { entity } = instance
  return (
    <InstancePreviewContainer>
      {entity.isItem && <GenericItem {...instance} />}
      {entity.isObject && <GenericObject {...instance} />}
    </InstancePreviewContainer>
  )
}

export default InstancePreview

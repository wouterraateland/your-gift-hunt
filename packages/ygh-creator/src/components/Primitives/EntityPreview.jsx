import React from "react"

import { getEntityComponent } from "ygh-entities"
import EntityContainer from "components/Primitives/EntityContainer"

const EntityPreview = ({
  entity,
  state,
  maxWidth = 1,
  maxHeight = 1,
  rotateObjects
}) => {
  if (!entity.isItem && !entity.isObject) {
    return null
  }

  const Component = getEntityComponent(
    entity.template ? entity.template.name : entity.name
  )

  if (!Component) {
    return null
  }

  return (
    <EntityContainer
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      component={Component}
    >
      <Component
        {...entity}
        rotation={rotateObjects && entity.isObject ? 45 : undefined}
        state={state}
        isInteractive={false}
      />
    </EntityContainer>
  )
}

export default EntityPreview

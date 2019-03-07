import React, { useMemo } from "react"

import GenericItem from "your-gift-hunt/items"
import GenericObject, { getObjectComponent } from "your-gift-hunt/objects"
import S from "sanctuary"

const Scaled = ({ isRotated, scale, ...otherProps }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `
      translate(-50%, -50%)
      rotate(${isRotated ? 45 : 0}deg)
      scale(${scale})`
    }}
    {...otherProps}
  />
)

const EntityInstancePreview = ({
  entity,
  state,
  maxWidth = 1,
  maxHeight = 1,
  rotateObjects = false
}) => {
  if (!entity.isItem && !entity.isObject) {
    return null
  }

  const scale = useMemo(
    () =>
      entity.isObject
        ? S.pipe([
            S.map(({ width, height }) =>
              Math.min(maxWidth / width, maxHeight / height)
            ),
            S.maybe(1)(x => x)
          ])(getObjectComponent(entity.name))
        : Math.min(maxWidth / 2, maxHeight / 2),
    [entity, maxWidth, maxHeight]
  )

  return (
    <Scaled scale={scale} isRotated={rotateObjects && entity.isObject}>
      {entity.isItem && <GenericItem entity={entity} state={state} />}
      {entity.isObject && <GenericObject entity={entity} state={state} />}
    </Scaled>
  )
}

export default EntityInstancePreview

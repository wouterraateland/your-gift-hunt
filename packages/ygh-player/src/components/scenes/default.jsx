import React from "react"

import useGame from "hooks/useGame"

import Scene from "components/Scene"
import { GenericEntity } from "components/Entities"

const expand = (r1, r2) => ({
  top: Math.min(r1.top, r2.top),
  left: Math.min(r1.left, r2.left),
  bottom: Math.max(r1.bottom, r2.bottom),
  right: Math.max(r1.right, r2.right)
})

const GenericEntityWithContainedEntities = props => {
  const { entities, isInInventory } = useGame()
  const containedEntities = entities.filter(
    ({ id, isObject, isItem, container }) =>
      (isObject || (isItem && !isInInventory(id))) &&
      container &&
      container.id === props.id
  )

  return (
    <GenericEntity {...props}>
      {containedEntities.map(entity => (
        <GenericEntityWithContainedEntities key={entity.id} {...entity} />
      ))}
    </GenericEntity>
  )
}

const DefaultScene = () => {
  const { entities, isInInventory } = useGame()
  const rootEntities = entities.filter(
    ({ id, isPlaceable, container }) =>
      isPlaceable && !container && !isInInventory(id)
  )
  const games = entities.filter(({ isGame }) => isGame)

  const { top, left, bottom, right } = rootEntities
    .map(({ rotation, left, top, width, height }) => {
      const cos = Math.cos((rotation * Math.PI) / 180)
      const sin = Math.sin((rotation * Math.PI) / 180)
      const xlt = left - (width / 2) * cos - (height / 2) * sin
      const xrt = left + (width / 2) * cos - (height / 2) * sin
      const xrb = left + (width / 2) * cos + (height / 2) * sin
      const xlb = left - (width / 2) * cos + (height / 2) * sin
      const ylt = top - (height / 2) * cos - (width / 2) * sin
      const yrt = top - (height / 2) * cos + (width / 2) * sin
      const yrb = top + (height / 2) * cos + (width / 2) * sin
      const ylb = top + (height / 2) * cos - (width / 2) * sin
      return {
        top: Math.min(ylt, yrt, yrb, ylb),
        left: Math.min(xlt, xrt, xrb, xlb),
        bottom: Math.max(ylt, yrt, yrb, ylb),
        right: Math.max(xlt, xrt, xrb, xlb)
      }
    })
    .reduce((acc, rect) => (acc ? expand(acc, rect) : rect), null)

  return (
    <>
      <Scene left={left} top={top} width={right - left} height={bottom - top}>
        {rootEntities.map(entity => (
          <GenericEntityWithContainedEntities key={entity.id} {...entity} />
        ))}
      </Scene>
      {games.map(entity => (
        <GenericEntity key={entity.id} {...entity} />
      ))}
    </>
  )
}

export default DefaultScene

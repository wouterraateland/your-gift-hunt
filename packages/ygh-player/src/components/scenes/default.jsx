import React from "react"

import useGame from "hooks/useGame"

import Scene from "components/Scene"
import { GenericEntity } from "components/Entities"

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
    ({ id, isObject, isItem, container }) =>
      (isObject || (isItem && !isInInventory(id))) && !container
  )

  return (
    <Scene left={-5} top={-42} width={80} height={80}>
      {rootEntities.map(entity => (
        <GenericEntityWithContainedEntities key={entity.id} {...entity} />
      ))}
    </Scene>
  )
}

export default DefaultScene

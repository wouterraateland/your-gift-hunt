import React from "react"

import useGame from "hooks/useGame"

import Scene from "components/Scene"
import { GenericEntity } from "components/Entities"

import defaultProps from "./defaultProps.json"

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
        <GenericEntityWithContainedEntities
          key={entity.id}
          {...defaultProps[entity.template.name]}
          {...entity}
        />
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
    <Scene left={-20} top={-40} width={40} height={80}>
      {rootEntities.map(entity => (
        <GenericEntityWithContainedEntities key={entity.id} {...entity} />
      ))}
    </Scene>
  )
}

export default DefaultScene

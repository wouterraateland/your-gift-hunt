import React, { useContext } from "react"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"

import EntitiesContainer from "./EntitiesContainer"
import EntityEntry from "./EntityEntry"

const getEntitiesFilter = type => {
  switch (type) {
    case "challenge":
      return ({ isObject, isItem, isTrigger }) =>
        !isObject && !isItem && !isTrigger
    case "object":
      return ({ isObject }) => isObject
    case "item":
      return ({ isItem }) => isItem
    case "trigger":
      return ({ name, isTrigger }) => isTrigger && name !== "Start trigger"
    default:
      return () => false
  }
}

const Entities = ({ isVisible, selectedType }) => {
  const {
    game: { instances }
  } = useContext(GameContext)
  const { entities } = useContext(EntitiesContext)
  const visibleEntities = entities.filter(getEntitiesFilter(selectedType))

  return (
    <EntitiesContainer isVisible={isVisible}>
      {visibleEntities.map(entity => (
        <EntityEntry
          key={entity.id}
          entity={entity}
          isDisabled={
            selectedType === "object" &&
            instances.some(instance => instance.entity.id === entity.id)
          }
        />
      ))}
    </EntitiesContainer>
  )
}

export default Entities

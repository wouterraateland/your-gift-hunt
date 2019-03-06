import React, { useContext } from "react"

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
      return ({ isTrigger }) => isTrigger
    default:
      return () => false
  }
}

const Entities = ({ isVisible, selectedType }) => {
  const { entities } = useContext(EntitiesContext)
  const visibleEntities = entities.filter(getEntitiesFilter(selectedType))

  return (
    <EntitiesContainer isVisible={isVisible}>
      {visibleEntities.map(entity => (
        <EntityEntry key={entity.id} entity={entity} />
      ))}
    </EntitiesContainer>
  )
}

export default Entities

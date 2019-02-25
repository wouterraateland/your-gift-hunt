import { useQuery } from "react-apollo-hooks"
import { ENTITIES } from "gql/queries"

const useEntities = () => {
  const { data, error } = useQuery(ENTITIES)

  if (error) {
    throw error
  }

  const { entities } = data
  const entityStates = entities.flatMap(({ states }) => states)
  const entityFields = entities.flatMap(({ fields }) => fields)

  const getEntityById = entityId => entities.find(({ id }) => id === entityId)

  const getEntityStateById = entityStateId =>
    entityStates.find(({ id }) => id === entityStateId)
  const getEntityFieldById = entityFieldId =>
    entityFields.find(({ id }) => id === entityFieldId)

  return {
    entities,
    entityStates,
    entityFields,
    getEntityById,
    getEntityStateById,
    getEntityFieldById
  }
}

export default useEntities

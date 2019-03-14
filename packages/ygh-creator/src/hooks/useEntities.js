import { useQuery } from "react-apollo-hooks"
import { ENTITIES } from "gql/queries"

const useEntities = () => {
  const { data, error } = useQuery(ENTITIES)

  if (error) {
    throw error
  }

  const { entities } = data
  const entityStates = entities.flatMap(({ states }) => states)
  const fields = entities.flatMap(({ fields }) => fields)

  const getEntityById = entityId => entities.find(({ id }) => id === entityId)

  const getEntityStateById = entityStateId =>
    entityStates.find(({ id }) => id === entityStateId)
  const getFieldById = fieldId => fields.find(({ id }) => id === fieldId)

  return {
    entities,
    entityStates,
    fields,
    getEntityById,
    getEntityStateById,
    getFieldById
  }
}

export default useEntities

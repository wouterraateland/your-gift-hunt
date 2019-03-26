import { useQuery } from "react-apollo-hooks"
import { ENTITY_TEMPLATES } from "gql/queries"

const useTemplates = () => {
  const { data, error } = useQuery(ENTITY_TEMPLATES)

  if (error) {
    throw error
  }

  const { entityTemplates } = data
  const stateTemplates = entityTemplates.flatMap(({ states }) => states)
  const fieldTemplates = entityTemplates.flatMap(({ fields }) => fields)

  const getEntityTemplateById = entityId =>
    entityTemplates.find(({ id }) => id === entityId)
  const getStateTemplateById = stateId =>
    stateTemplates.find(({ id }) => id === stateId)
  const getFieldTemplateById = fieldId =>
    fieldTemplates.find(({ id }) => id === fieldId)

  return {
    entityTemplates,
    stateTemplates,
    fieldTemplates,
    getEntityTemplateById,
    getStateTemplateById,
    getFieldTemplateById
  }
}

export default useTemplates

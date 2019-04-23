import { useCallback, useContext } from "react"
import { useQuery } from "react-apollo-hooks"
import { ENTITY_TEMPLATES } from "gql/queries"

import TemplatesContext from "contexts/Templates"

export const useTemplatesProvider = () => {
  const { data, error } = useQuery(ENTITY_TEMPLATES)

  if (error) {
    throw error
  }

  const { entityTemplates } = data
  const stateTemplates = entityTemplates.flatMap(({ states }) => states)
  const fieldTemplates = entityTemplates.flatMap(({ fields }) => fields)

  const getEntityTemplateById = useCallback(
    entityId => entityTemplates.find(({ id }) => id === entityId),
    [entityTemplates]
  )
  const getStateTemplateById = useCallback(
    stateId => stateTemplates.find(({ id }) => id === stateId),
    [stateTemplates]
  )
  const getFieldTemplateById = useCallback(
    fieldId => fieldTemplates.find(({ id }) => id === fieldId),
    [fieldTemplates]
  )

  return {
    entityTemplates,
    stateTemplates,
    fieldTemplates,
    getEntityTemplateById,
    getStateTemplateById,
    getFieldTemplateById
  }
}

const useTemplates = () => useContext(TemplatesContext)
export default useTemplates

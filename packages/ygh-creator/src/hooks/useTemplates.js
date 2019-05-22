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
  const portalTemplates = entityTemplates.flatMap(({ portals }) => portals)
  const entranceTemplates = entityTemplates.flatMap(
    ({ entrances }) => entrances
  )

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
  const getPortalTemplateById = useCallback(
    portalId => portalTemplates.find(({ id }) => id === portalId),
    [portalTemplates]
  )
  const getEntranceTemplateById = useCallback(
    entranceId => entranceTemplates.find(({ id }) => id === entranceId),
    [entranceTemplates]
  )

  return {
    entityTemplates,
    stateTemplates,
    fieldTemplates,
    portalTemplates,
    entranceTemplates,
    getEntityTemplateById,
    getStateTemplateById,
    getFieldTemplateById,
    getPortalTemplateById,
    getEntranceTemplateById
  }
}

const useTemplates = () => useContext(TemplatesContext)
export default useTemplates

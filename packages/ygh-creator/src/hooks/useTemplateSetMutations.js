import { useContext } from "react"
import { useMutation } from "react-apollo-hooks"

import useSaveState from "hooks/useSaveState"
import useTemplateSet from "hooks/useTemplateSet"

import TemplateSetMutationsContext from "contexts/TemplateSetMutations"

import { TEMPLATE_SET_BY_ID } from "gql/queries"
import {
  UPDATE_TEMPLATE_SET,
  CREATE_ENTITY_TEMPLATE,
  UPDATE_ENTITY_TEMPLATE,
  DELETE_ENTITY_TEMPLATE,
  UPDATE_STATE_TRANSITION_TEMPLATE
} from "gql/mutations"

const useMutationWith = save => (mutation, transform) => {
  const actualMutation = useMutation(mutation)
  return save((...args) => actualMutation(transform(...args)))
}

export const useTemplateSetMutationsProvider = () => {
  const { templateSet, variables } = useTemplateSet()
  const query = { query: TEMPLATE_SET_BY_ID, variables }

  const { save } = useSaveState()

  const useMutationWithSave = useMutationWith(save)

  const updateTemplateSetSettings = useMutationWithSave(
    UPDATE_TEMPLATE_SET,
    (templateSetId, values) => ({
      variables: {
        templateSetId,
        values
      }
    })
  )

  const createEntityTemplate = useMutationWithSave(
    CREATE_ENTITY_TEMPLATE,
    () => ({
      variables: {
        templateSetId: templateSet.id
      },
      update: (proxy, { data: { createEntityTemplate } }) => {
        const data = proxy.readQuery(query)

        data.entityTemplateSet.entityTemplates.push(createEntityTemplate)

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const updateEntityTemplate = useMutationWithSave(
    UPDATE_ENTITY_TEMPLATE,
    (entityTemplateId, update) => ({
      variables: {
        entityTemplateId,
        update
      }
    })
  )

  const deleteEntityTemplate = useMutationWithSave(
    DELETE_ENTITY_TEMPLATE,
    entityTemplateId => ({
      variables: {
        entityTemplateId
      },
      update: proxy => {
        const data = proxy.readQuery(query)

        data.entityTemplateSet.entityTemplates = data.entityTemplateSet.entityTemplates.filter(
          ({ id }) => id !== entityTemplateId
        )

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const updateStateTransitionTemplate = useMutationWithSave(
    UPDATE_STATE_TRANSITION_TEMPLATE,
    (stateTransitionTemplateId, update) => ({
      variables: {
        stateTransitionTemplateId,
        update
      }
    })
  )

  return {
    updateTemplateSetSettings,
    createEntityTemplate,
    updateEntityTemplate,
    deleteEntityTemplate,
    updateStateTransitionTemplate
  }
}

const useTemplateSetMutations = () => useContext(TemplateSetMutationsContext)
export default useTemplateSetMutations

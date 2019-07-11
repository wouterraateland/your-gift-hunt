import React, { useCallback } from "react"

import useAuth from "hooks/useAuth"
import { useMutation } from "react-apollo-hooks"

import { Menu } from "ygh-ui"

import { USER_TEMPLATE_SETS } from "gql/queries"
import { DELETE_TEMPLATE_SET } from "gql/mutations"

const MoreActions = ({ templateSet }) => {
  const { user } = useAuth()
  const deleteTemplateSetMutation = useMutation(DELETE_TEMPLATE_SET)

  const deleteTemplateSet = useCallback(async () => {
    await deleteTemplateSetMutation({
      variables: { templateSetId: templateSet.id },
      update: (
        proxy,
        {
          data: {
            deleteEntityTemplateSet: { id }
          }
        }
      ) => {
        const query = {
          query: USER_TEMPLATE_SETS,
          variables: { userId: user.id }
        }

        const data = proxy.readQuery(query)
        const index = data.user.entityTemplateSetsCreated.findIndex(
          game => game.id === id
        )
        if (index !== -1) {
          data.user.entityTemplateSetsCreated.splice(index, 1)
        }

        proxy.writeQuery({ ...query, data })
      }
    })
  }, [templateSet.id, user.id])

  return (
    <Menu.Container onClick={event => event.stopPropagation()}>
      <Menu.Toggle />
      <Menu.Items>
        <Menu.Item as="div" color="error" onClick={deleteTemplateSet}>
          Delete
        </Menu.Item>
      </Menu.Items>
    </Menu.Container>
  )
}

export default MoreActions

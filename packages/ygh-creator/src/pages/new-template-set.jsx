import { useEffect } from "react"

import { navigate } from "@reach/router"

import useAuth from "hooks/useAuth"
import { useMutation } from "react-apollo-hooks"

import { USER_TEMPLATE_SETS } from "gql/queries"
import { CREATE_TEMPLATE_SET } from "gql/mutations"

const NewTemplateSetPage = () => {
  const { user } = useAuth()

  const createEntityTemplateSet = useMutation(CREATE_TEMPLATE_SET)

  useEffect(() => {
    const createTemplateSet = async () => {
      const { data } = await createEntityTemplateSet({
        variables: {
          values: {
            name: "Nameless",
            description: "",
            creator: { connect: { id: user.id } }
          }
        },
        update: (proxy, { data: { createEntityTemplateSet } }) => {
          const query = {
            query: USER_TEMPLATE_SETS,
            variables: { userId: user.id }
          }
          const data = proxy.readQuery(query)
          data.user.entityTemplateSetsCreated.push(createEntityTemplateSet)

          proxy.writeQuery({ ...query, data })
        }
      })

      navigate(`/edit-template-set/${data.createEntityTemplateSet.id}`, {
        replace: true
      })
    }

    createTemplateSet()
  }, [])

  return null
}

export default NewTemplateSetPage

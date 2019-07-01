import { useContext } from "react"
import { useQuery } from "react-apollo-hooks"
import { TEMPLATE_SET_BY_ID } from "gql/queries"

import TemplateSetContext from "contexts/TemplateSet"

export const useTemplateSetProvider = variables => {
  const { data, error } = useQuery(TEMPLATE_SET_BY_ID, { variables })

  if (error) {
    throw error
  }

  return data.entityTemplateSet
    ? {
        templateSetExists: true,
        templateSet: data.entityTemplateSet,
        variables
      }
    : {
        templateSetExists: false,
        variables
      }
}

const useTemplateSet = () => useContext(TemplateSetContext)
export default useTemplateSet

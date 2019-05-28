import { useContext } from "react"
import { useQuery } from "react-apollo-hooks"
import { TEMPLATE_OPTIONS } from "gql/queries"

import TemplateOptionsContext from "contexts/TemplateOptions"

export const useTemplateOptionsProvider = () => {
  const { data, error } = useQuery(TEMPLATE_OPTIONS)

  if (error) {
    throw error
  }

  return data
}

const useTemplateOptions = () => useContext(TemplateOptionsContext)
export default useTemplateOptions

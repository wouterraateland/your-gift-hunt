import { useContext } from "react"
import useTemplateSet from "hooks/useTemplateSet"

import TemplatesContext from "contexts/Templates"

export const useTemplatesProvider = () => {
  const { templateSetExists, templateSet } = useTemplateSet()

  const templates = templateSetExists ? templateSet.entityTemplates : []

  const getTemplateById = templateId =>
    templates.find(({ id }) => id === templateId)

  return {
    templates,
    getTemplateById
  }
}

const useTemplates = () => useContext(TemplatesContext)
export default useTemplates

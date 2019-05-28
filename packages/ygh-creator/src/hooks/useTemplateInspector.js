import { useCallback, useContext, useState } from "react"
import TemplateInspectorContext from "contexts/TemplateInspector"

export const useTemplateInspectorProvider = () => {
  const [state, setState] = useState({
    inspectedTemplate: null,
    isOpen: false
  })

  const closeTemplateInspector = useCallback(
    () => {
      if (state.isOpen) {
        setState(state => ({ ...state, isOpen: false }))
      }
    },
    [state.isOpen]
  )

  const inspectTemplate = useCallback(inspectedTemplate =>
    setState({
      inspectedTemplate,
      isOpen: true
    })
  )
  return {
    closeTemplateInspector,
    inspectTemplate,
    ...state
  }
}

const useTemplateInspector = () => useContext(TemplateInspectorContext)
export default useTemplateInspector

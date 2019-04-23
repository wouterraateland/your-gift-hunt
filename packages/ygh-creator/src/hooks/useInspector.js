import { useCallback, useContext, useState } from "react"
import InspectorContext from "contexts/Inspector"

export const useInspectorProvider = () => {
  const [state, setState] = useState({
    nodeId: null,
    isOpen: false
  })

  const closeInspector = useCallback(
    () => setState(state => ({ ...state, isOpen: false })),
    []
  )

  const inspectNode = useCallback(
    nodeId =>
      setState({
        nodeId,
        isOpen: true
      }),
    []
  )

  return {
    closeInspector,
    inspectNode,
    ...state
  }
}

const useInspector = () => useContext(InspectorContext)
export default useInspector

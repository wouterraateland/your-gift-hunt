import { useState } from "react"

const useInspector = () => {
  const [state, setState] = useState({
    nodeId: null,
    isOpen: false
  })

  return {
    closeInspector: () => setState(state => ({ ...state, isOpen: false })),
    inspectNode: nodeId =>
      setState({
        nodeId,
        isOpen: true
      }),
    ...state
  }
}

export default useInspector

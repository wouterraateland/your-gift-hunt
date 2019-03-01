import { useState } from "react"

const useInspector = () => {
  const [state, setState] = useState({
    nodeId: "cjrkicbon00hv0860oz72e7v8", // null,
    isOpen: true // false,
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

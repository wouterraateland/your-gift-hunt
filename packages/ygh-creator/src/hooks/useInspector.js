import { useState } from "react"

const useInspector = () => {
  const [state, setState] = useState({
    nodeId: "cjrkgwu8300670860nlhfyku8", // null,
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

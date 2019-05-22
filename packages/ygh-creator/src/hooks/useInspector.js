import { useCallback, useContext, useState } from "react"
import InspectorContext from "contexts/Inspector"

import useEntities from "hooks/useEntities"

export const useInspectorProvider = () => {
  const { entities } = useEntities()

  const [state, setState] = useState({
    inspectedEntity: null,
    inspectedState: null,
    isOpen: false
  })

  const closeInspector = useCallback(
    () => {
      if (state.isOpen) {
        setState(state => ({ ...state, isOpen: false }))
      }
    },
    [state.isOpen]
  )

  const inspectEntity = useCallback(inspectedEntity =>
    setState({
      inspectedEntity,
      inspectedState: null,
      isOpen: true
    })
  )

  const inspectState = useCallback(
    inspectedState =>
      setState({
        inspectedEntity: entities.find(({ states }) =>
          states.some(({ id }) => id === inspectedState)
        ).id,
        inspectedState,
        isOpen: true
      }),
    [entities]
  )

  return {
    closeInspector,
    inspectEntity,
    inspectState,
    ...state
  }
}

const useInspector = () => useContext(InspectorContext)
export default useInspector

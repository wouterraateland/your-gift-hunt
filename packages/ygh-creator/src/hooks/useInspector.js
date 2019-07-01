import { useCallback, useContext, useState } from "react"
import InspectorContext from "contexts/Inspector"

import useEntities from "hooks/useEntities"
import useGameTemplates from "hooks/useGameTemplates"

export const useInspectorProvider = () => {
  const { entities } = useEntities()
  const { entityTemplates } = useGameTemplates()

  const [state, setState] = useState({
    inspectedEntity: null,
    inspectedState: null,
    isOpen: false
  })

  const closeInspector = useCallback(() => {
    if (state.isOpen) {
      setState(state => ({ ...state, isOpen: false }))
    }
  }, [state.isOpen])

  const inspectEntity = useCallback(
    inspectedEntity => {
      const entity = entities.find(({ id }) => id === inspectedEntity)
      if (entityTemplates.some(({ id }) => id === entity.template.id)) {
        setState({
          inspectedEntity,
          inspectedState: null,
          isOpen: true
        })
      }
    },
    [entityTemplates, entities]
  )

  const inspectState = useCallback(
    inspectedState => {
      const entity = entities.find(({ states }) =>
        states.some(({ id }) => id === inspectedState)
      )
      if (entityTemplates.some(({ id }) => id === entity.template.id)) {
        setState({
          inspectedEntity: entity.id,
          inspectedState,
          isOpen: true
        })
      }
    },
    [entityTemplates, entities]
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

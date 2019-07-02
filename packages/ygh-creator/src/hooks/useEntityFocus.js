import { useCallback, useState } from "react"
import EntityFocusContext from "contexts/EntityFocus"

import useContext from "hooks/useContext"

export const useEntityFocusProvider = () => {
  const [focusedEntityId, focus] = useState(null)
  const blur = useCallback(() => focus(null), [])

  return {
    blur,
    focus,
    focusedEntityId
  }
}

export const useEntityFocusHandlers = () => useContext(EntityFocusContext, 0)

const useEntityFocus = () => useContext(EntityFocusContext, 1)
export default useEntityFocus

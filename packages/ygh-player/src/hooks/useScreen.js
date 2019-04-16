import { useCallback, useContext, useState } from "react"
import ScreenContext from "contexts/Screen"

const initialState = { component: null, entityId: null }

export const useScreenProvider = () => {
  const [screen, setScreen] = useState(initialState)

  const popup = useCallback(
    (component, entityId) => setScreen({ component, entityId }),
    []
  )
  const close = useCallback(() => setScreen(initialState), [])

  return {
    screen,
    popup,
    close
  }
}

const useScreen = () => useContext(ScreenContext)
export default useScreen

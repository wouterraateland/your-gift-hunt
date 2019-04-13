import { useCallback, useContext, useState } from "react"
import ScreenContext from "contexts/Screen"

export const useScreenProvider = () => {
  const [screen, setScreen] = useState(null)

  const popup = useCallback(
    (component, props = {}) =>
      setScreen({
        component,
        props
      }),
    []
  )
  const close = useCallback(() => setScreen(null), [])

  return {
    screen,
    popup,
    close
  }
}

const useScreen = () => useContext(ScreenContext)
export default useScreen

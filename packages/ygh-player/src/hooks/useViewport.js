import { useContext, useRef } from "react"
import ViewportContext from "contexts/Viewport"

export const useViewportProvider = () => {
  const viewportRef = useRef(null)

  return {
    viewportRef
  }
}

const useViewport = () => useContext(ViewportContext)
export default useViewport

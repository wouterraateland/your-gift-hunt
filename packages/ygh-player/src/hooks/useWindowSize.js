import { useCallback, useEffect, useState } from "react"

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  rem: parseFloat(getComputedStyle(document.documentElement).fontSize),
  orientation: window.innerWidth > window.innerHeight ? "landscape" : "portrait"
})

const useWindowSize = () => {
  const [size, setSize] = useState(getSize())

  const handleOnWindowResize = useCallback(() => setSize(getSize()), [])

  useEffect(() => {
    window.addEventListener("resize", handleOnWindowResize)
    return () => {
      window.removeEventListener("resize", handleOnWindowResize)
    }
  }, [])

  return size
}

export default useWindowSize

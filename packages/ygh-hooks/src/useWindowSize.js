import { useCallback, useEffect, useState } from "react"

const getSize = () => ({
  width: typeof window === "undefined" ? 0 : window.innerWidth,
  height: typeof window === "undefined" ? 0 : window.innerHeight,
  rem:
    typeof document === "undefined"
      ? 16
      : parseFloat(getComputedStyle(document.documentElement).fontSize),
  orientation:
    typeof window === "undefined"
      ? "landscape"
      : window.innerWidth > window.innerHeight
      ? "landscape"
      : "portrait"
})

const useWindowSize = () => {
  const [size, setSize] = useState(getSize())

  const handleOnWindowResize = useCallback(() => setSize(getSize()), [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleOnWindowResize)
      return () => {
        window.removeEventListener("resize", handleOnWindowResize)
      }
    }
  }, [])

  return size
}

export default useWindowSize

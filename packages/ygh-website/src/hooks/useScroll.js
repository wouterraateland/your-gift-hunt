import { useCallback, useEffect, useState } from "react"

const getScrollPosition = ref =>
  ref.current
    ? ref.current.scrollTop === undefined
      ? {
          top: ref.current.scrollY,
          left: ref.current.scrollX
        }
      : {
          top: ref.current.scrollTop,
          left: ref.current.scrollLeft
        }
    : {
        top: 0,
        left: 0
      }

const useScroll = ref => {
  const [state, setState] = useState(getScrollPosition(ref))

  const onScroll = useCallback(() => {
    setState(getScrollPosition(ref))
  }, [ref])

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scroll", onScroll)
      return () => {
        if (ref.current) {
          ref.current.removeEventListener("scroll", onScroll)
        }
      }
    }
  }, [ref])

  return state
}

export default useScroll

import { useCallback, useEffect } from "react"

const isParentOrSame = (el, parent) =>
  el && (el === parent || isParentOrSame(el.parentElement, parent))

const useClickOutside = ({ ref, onClickOutside, inputs = [] }) => {
  const onClick = useCallback(
    event => {
      if (!isParentOrSame(event.target, ref.current)) {
        onClickOutside(event)
      }
    },
    [ref, ...inputs]
  )

  useEffect(() => {
    window.addEventListener("mouseup", onClick)
    return () => {
      window.removeEventListener("mouseup", onClick)
    }
  }, [ref, ...inputs])
}

export default useClickOutside

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
    [ref, onClickOutside, ...inputs]
  )

  useEffect(
    () => {
      window.addEventListener("mouseup", onClick)
      return () => {
        window.removeEventListener("mouseup", onClick)
      }
    },
    [ref, onClickOutside, ...inputs]
  )
}

export default useClickOutside

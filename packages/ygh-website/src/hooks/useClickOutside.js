import { useCallback, useEffect } from "react"

const useClickOutside = ({ ref, onClickOutside, inputs = [] }) => {
  const onClick = useCallback(
    event => event.path.includes(ref.current) || onClickOutside(),
    [ref, ...inputs]
  )

  useEffect(
    () => {
      window.addEventListener("mouseup", onClick)
      return () => {
        window.removeEventListener("mouseup", onClick)
      }
    },
    [ref, ...inputs]
  )
}

export default useClickOutside

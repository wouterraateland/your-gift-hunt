import { useCallback, useEffect } from "react"

const useClickOutside = ({ ref, onClickOutside }) => {
  const onClick = useCallback(
    event => event.path.includes(ref.current) || onClickOutside(),
    [ref, onClickOutside]
  )

  useEffect(() => {
    window.addEventListener("mouseup", onClick)
    return () => {
      window.removeEventListener("mouseup", onClick)
    }
  }, [])
}

export default useClickOutside

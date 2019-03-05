import { useEffect } from "react"

const useClickOutside = ({ ref, onClickOutside }) => {
  const onClick = event => event.path.includes(ref.current) || onClickOutside()

  useEffect(() => {
    window.addEventListener("mouseup", onClick)
    return () => {
      window.removeEventListener("mouseup", onClick)
    }
  }, [])
}

export default useClickOutside

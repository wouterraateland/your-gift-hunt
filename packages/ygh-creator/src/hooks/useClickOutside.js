import { useEffect } from "react"

const useClickOutside = ({ ref, onClickOutside }) => {
  const onClick = event => event.path.includes(ref.current) || onClickOutside()

  useEffect(() => {
    window.addEventListener("click", onClick, true)
    return () => {
      window.removeEventListener("click", onClick, true)
    }
  }, [])
}

export default useClickOutside

import { useContext } from "react"
import ScreenContext from "contexts/Screen"

const usePopup = () => {
  const { popup } = useContext(ScreenContext)
  return popup
}

export default usePopup

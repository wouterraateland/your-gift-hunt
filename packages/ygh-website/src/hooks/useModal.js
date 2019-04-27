import { useCallback, useContext, useState } from "react"

import ModalContext from "contexts/Modal"

export const useModalProvider = () => {
  const [children, setChildren] = useState(null)

  const popup = setChildren
  const close = useCallback(() => setChildren(null), [])

  return {
    popup,
    close,
    children
  }
}

const useModal = () => useContext(ModalContext)
export default useModal

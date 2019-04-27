import React, { createContext } from "react"
import { useModalProvider } from "hooks/useModal"

import ModalContainer from "containers/Modal"

const ModalContext = createContext(null)

export const ModalProvider = ({ children, ...otherProps }) => {
  const value = useModalProvider(otherProps)
  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  )
}

export default ModalContext

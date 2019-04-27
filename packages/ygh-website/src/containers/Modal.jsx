import React, { Children, cloneElement, useRef } from "react"
import { createPortal } from "react-dom"
import ModalBackground from "components/ModalBackground"

import useClickOutside from "hooks/useClickOutside"
import useModal from "hooks/useModal"

const root =
  typeof document !== "undefined" ? document.getElementById("___modal") : null

const Modal = () => {
  const ref = useRef(null)
  const { children, close } = useModal()

  useClickOutside({ ref, onClickOutside: close })

  if (root && children) {
    Children.only(children)
    const enhancedChildren = cloneElement(children, { ref })

    return createPortal(
      <ModalBackground>{enhancedChildren}</ModalBackground>,
      root
    )
  } else {
    return null
  }
}

export default Modal

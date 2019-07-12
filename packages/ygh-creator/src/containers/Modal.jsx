import { cloneElement, Children, useRef } from "react"
import { createPortal } from "react-dom"

import { useClickOutside } from "ygh-hooks"

const modalRoot = document.getElementById("modal-root")

const Modal = ({ children }) => {
  const ref = useRef(null)
  useClickOutside({ ref, onClickOutside: () => window.history.back() })

  Children.only(children)
  const childWithRef = cloneElement(children, { ref })

  return createPortal(childWithRef, modalRoot)
}

export default Modal

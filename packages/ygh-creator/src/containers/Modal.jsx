import { createPortal } from "react-dom"

const modalRoot = document.getElementById("modal-root")

const Modal = ({ children }) => createPortal(children, modalRoot)

export default Modal

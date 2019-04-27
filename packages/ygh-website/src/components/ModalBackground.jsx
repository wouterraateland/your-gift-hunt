import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #0009;

  animation: ${fadeIn} 0.5s ease-out forwards;
`

export default ModalBackground

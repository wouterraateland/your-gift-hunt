import React from "react"
import styled from "styled-components"

import useInspector from "hooks/useInspector"

const FloatingButton = styled.button`
  cursor: pointer;

  position: absolute;
  left: 1rem;
  top: 1rem;

  width: 1.5em;
  height: 1.5em;
  border: none;
  padding: 0.25em;

  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.medium};

  text-align: center;
  line-height: 1;
  font-size: 1.5em;

  background: #fff;

  @media (min-width: 40em) {
    display: none;
  }
`

const CloseButton = () => {
  const { closeInspector } = useInspector()

  return <FloatingButton onClick={closeInspector}>&times;</FloatingButton>
}

export default CloseButton

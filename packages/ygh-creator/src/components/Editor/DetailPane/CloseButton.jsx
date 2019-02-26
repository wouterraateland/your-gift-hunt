import React, { useContext } from "react"
import styled from "styled-components"

import InspectorContext from "contexts/Inspector"

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
  box-shadow: 0 0.5rem 1.5rem #0004;

  text-align: center;
  line-height: 1;
  font-size: 1.5em;

  background: #fff;

  @media (min-width: 40em) {
    display: none;
  }
`

const CloseButton = () => {
  const { closeInspector } = useContext(InspectorContext)

  return <FloatingButton onClick={closeInspector}>&times;</FloatingButton>
}

export default CloseButton

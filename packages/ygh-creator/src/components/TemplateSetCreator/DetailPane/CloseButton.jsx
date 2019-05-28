import React from "react"
import styled from "styled-components"

import useTemplateInspector from "hooks/useTemplateInspector"

const FloatingButton = styled.button`
  cursor: pointer;

  display: none;
  width: 1.5em;
  height: 1.5em;
  border: none;
  padding: 0.25em;
  margin-bottom: 1rem;

  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.medium};

  text-align: center;
  line-height: 1;
  font-size: 1.5em;

  background: #fff;

  @media (max-width: 30em) {
    display: block;
  }
`

const CloseButton = () => {
  const { closeTemplateInspector } = useTemplateInspector()

  return (
    <FloatingButton onClick={closeTemplateInspector}>&times;</FloatingButton>
  )
}

export default CloseButton

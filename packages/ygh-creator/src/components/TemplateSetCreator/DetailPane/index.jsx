import React from "react"
import styled, { css } from "styled-components"

import useTemplates from "hooks/useTemplates"
import useTemplateInspector from "hooks/useTemplateInspector"

import EditableTemplate from "./EditableTemplate"

const Container = styled.div`
  width: calc(100% - 17em);
  padding: 1em;
  flex-grow: 1;

  overflow-x: hidden;
  overflow-y: auto;

  ${props =>
    props.isEmpty &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}

  @media (max-width: 30em) {
    width: 100vw;
    flex-grow: 0;
  }
`

const DetailPane = () => {
  const { templates } = useTemplates()
  const { isOpen, inspectedTemplate } = useTemplateInspector()
  const template = templates.find(({ id }) => id === inspectedTemplate)

  return (
    <Container isEmpty={!isOpen}>
      {isOpen ? (
        <EditableTemplate template={template} />
      ) : (
        <em>Select a template to edit it.</em>
      )}
    </Container>
  )
}

export default DetailPane

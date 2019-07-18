import React, { useCallback } from "react"
import styled from "styled-components"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"
import useTemplateInspector from "hooks/useTemplateInspector"

import { Paper } from "ygh-ui"
import { Item, Object as ObjectIcon, Container, Trigger } from "ygh-icons"

import Form from "components/TemplateSetCreator/DetailPane/Form"

import FieldTag from "components/Primitives/FieldTag"

const StyledPaper = styled(Paper)`
  border-bottom: 1px solid #0002;
  border-radius: 0;
  box-shadow: none;
`

const Meta = ({ template }) => {
  const {
    updateEntityTemplate,
    deleteEntityTemplate
  } = useTemplateSetMutations()
  const { closeTemplateInspector } = useTemplateInspector()

  const getInitialValues = useCallback(
    () => ({
      name: template.name,
      description: template.description,
      attributes: Object.entries({
        isItem: template.isItem,
        isObject: template.isObject,
        isTrigger: template.isTrigger,
        isContainer: template.isContainer
      })
        .filter(([_, value]) => value)
        .map(([key]) => key),
      featuredField: template.featuredField ? template.featuredField.id : null
    }),
    [template]
  )

  const onFlush = useCallback(
    values => {
      updateEntityTemplate(template.id, {
        name: values.name,
        description: values.description,
        isItem: values.attributes.includes("isItem"),
        isObject: values.attributes.includes("isObject"),
        isTrigger: values.attributes.includes("isTrigger"),
        isContainer: values.attributes.includes("isContainer"),
        featuredField: values.featuredField
          ? { connect: { id: values.featuredField } }
          : template.featuredField
          ? { disconnect: true }
          : null
      })
    },
    [template.id]
  )

  const onDelete = useCallback(() => {
    closeTemplateInspector()
    deleteEntityTemplate(template.id)
  }, [template.id])

  return (
    <StyledPaper>
      <Paper.Section>
        <Form
          getInitialValues={getInitialValues}
          onFlush={onFlush}
          onDelete={onDelete}
          fields={[
            {
              name: "name",
              type: "text",
              label: "Name"
            },
            {
              name: "description",
              type: "textarea",
              label: "Description"
            },
            {
              name: "attributes",
              type: "selectMultiple",
              label: "Attributes",
              format: "horizontal",
              options: [
                {
                  value: "isItem",
                  label: (
                    <>
                      <Item /> Item
                    </>
                  )
                },
                {
                  value: "isObject",
                  label: (
                    <>
                      <ObjectIcon /> Object
                    </>
                  )
                },
                {
                  value: "isContainer",
                  label: (
                    <>
                      <Container /> Container
                    </>
                  )
                },
                {
                  value: "isTrigger",
                  label: (
                    <>
                      <Trigger /> Trigger
                    </>
                  )
                }
              ]
            },
            {
              name: "featuredField",
              type: "select",
              label: "Featured field",
              options: template.fields.map(field => ({
                label: <FieldTag field={field} />,
                value: field.id
              }))
            }
          ]}
        />
      </Paper.Section>
    </StyledPaper>
  )
}

export default Meta

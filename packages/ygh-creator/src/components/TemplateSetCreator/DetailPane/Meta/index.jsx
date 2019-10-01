import React, { useCallback, useState } from "react"
import styled from "styled-components"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"
import useTemplateInspector from "hooks/useTemplateInspector"

import { Paper, TabOptions } from "ygh-ui"
import Icons from "ygh-icons"

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
  const [isPlaceable, setIsPlaceable] = useState(template.isPlaceable)

  const getInitialValues = useCallback(
    () => ({
      name: template.name,
      description: template.description,
      isPlaceable: template.isPlaceable,
      type: template.isPlaceable
        ? template.isContainer
          ? "container"
          : template.isItem
          ? "item"
          : template.isPortal
          ? "portal"
          : "object"
        : template.isContainer
        ? "container"
        : template.isTrigger
        ? "trigger"
        : "challenge",
      featuredField: template.featuredField ? template.featuredField.id : null
    }),
    [template]
  )

  const onFlush = useCallback(
    values => {
      updateEntityTemplate(template.id, {
        name: values.name,
        description: values.description,
        isPlaceable: values.isPlaceable,
        isItem: values.type === "item",
        isObject: values.type === "object" || values.isPlaceable,
        isTrigger: values.type === "trigger",
        isContainer: values.type === "container",
        isPortal: values.type === "portal",
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
          onChange={(values, setField) => {
            setIsPlaceable(values.isPlaceable)
            if (
              values.isPlaceable &&
              ["trigger", "challenge"].includes(values.type)
            ) {
              setField("type", "object")
            }
            if (
              !values.isPlaceable &&
              ["item", "object", "portal"].includes(values.type)
            ) {
              setField("type", "challenge")
            }
          }}
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
              name: "isPlaceable",
              type: "checkbox",
              label: "Placeable"
            },
            {
              name: "type",
              type: "select",
              label: "Type",
              component: TabOptions,
              options: isPlaceable
                ? [
                    {
                      value: "item",
                      label: (
                        <>
                          <Icons.Key /> Item
                        </>
                      )
                    },
                    {
                      value: "object",
                      label: (
                        <>
                          <Icons.Cube /> Object
                        </>
                      )
                    },
                    {
                      value: "portal",
                      label: (
                        <>
                          <Icons.Door /> Portal
                        </>
                      )
                    },
                    {
                      value: "container",
                      label: (
                        <>
                          <Icons.ContainerPlaceable /> Container
                        </>
                      )
                    }
                  ]
                : [
                    {
                      value: "container",
                      label: (
                        <>
                          <Icons.ContainerNonPlaceable /> Container
                        </>
                      )
                    },
                    {
                      value: "challenge",
                      label: (
                        <>
                          <Icons.Piece /> Challenge
                        </>
                      )
                    },
                    {
                      value: "trigger",
                      label: (
                        <>
                          <Icons.Trigger /> Trigger
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

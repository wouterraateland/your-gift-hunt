import React, { useCallback, useState } from "react"
import styled from "styled-components"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"
import useTemplateInspector from "hooks/useTemplateInspector"

import { Paper, DefaultOptions, TabOptions } from "ygh-ui"
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
      isPlaceable: template.isPlaceable ? [true] : [],
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
        isPlaceable: values.isPlaceable.includes(true),
        isItem: values.type === "item",
        isObject: values.type === "object" || values.isPlaceable.includes(true),
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
            const _isPlaceable = values.isPlaceable.length === 1
            setIsPlaceable(_isPlaceable)
            if (
              _isPlaceable &&
              ["trigger", "challenge"].includes(values.type)
            ) {
              setField("type", "object")
            }
            if (
              !_isPlaceable &&
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
              type: "selectMultiple",
              label: "Placeable",
              component: DefaultOptions,
              options: [
                {
                  value: true,
                  label: "Is placeable in the visual editor"
                }
              ]
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

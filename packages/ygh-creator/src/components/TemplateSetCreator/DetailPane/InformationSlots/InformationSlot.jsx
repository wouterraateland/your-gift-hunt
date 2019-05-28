import React, { useCallback } from "react"

import useTemplateSetMutations from "hooks/useTemplateSetMutations"
import useTemplateOptions from "hooks/useTemplateOptions"

import Form from "components/TemplateSetCreator/DetailPane/Form"

import StateTag from "components/Primitives/StateTag"

const InformationSlotForm = ({ template, slot }) => {
  const { fieldTypes } = useTemplateOptions()
  const { updateEntityTemplate } = useTemplateSetMutations()

  const getInitialValues = useCallback(
    () => ({
      name: slot.name,
      description: slot.description,
      allowedTypes: slot.allowedTypes.map(({ type }) => type),
      isMulti: slot.allowedTypes.some(({ isMulti }) => isMulti),
      states: slot.states.map(({ id }) => id)
    }),
    [slot]
  )

  const onFlush = useCallback(
    values => {
      updateEntityTemplate(template.id, {
        informationSlots: {
          update: [
            {
              where: { id: slot.id },
              data: {
                name: values.name,
                description: values.description,
                allowedTypes: {
                  set: values.allowedTypes
                    .map(type =>
                      fieldTypes.find(
                        fieldType =>
                          fieldType.type === type &&
                          fieldType.isMulti === values.isMulti
                      )
                    )
                    .map(({ id }) => ({ id }))
                },
                states: {
                  set: values.states.map(id => ({ id }))
                }
              }
            }
          ]
        }
      })
    },
    [slot.id]
  )

  const onDelete = useCallback(
    () => {
      updateEntityTemplate(template.id, {
        informationSlots: {
          delete: { id: slot.id }
        }
      })
    },
    [slot.id]
  )

  return (
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
          label: "Description",
          type: "textarea"
        },
        [
          {
            name: "allowedTypes",
            type: "selectMultiple",
            format: "horizontal",
            label: "Allowed value types",
            options: [
              { label: "String", value: "STRING" },
              { label: "Number", value: "NUMBER" },
              { label: "Boolean", value: "BOOLEAN" },
              { label: "Timestamp", value: "TIMESTAMP" },
              { label: "Geopoint", value: "GEOPOINT" }
            ]
          },
          {
            name: "isMulti",
            type: "checkbox",
            label: "Holds multiple values for selected types"
          }
        ],
        {
          name: "states",
          type: "selectMultiple",
          label: "Available in states",
          options: template.states.map(state => ({
            label: <StateTag state={state} />,
            value: state.id
          }))
        }
      ]}
    />
  )
}

export default InformationSlotForm

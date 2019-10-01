import React, { useCallback } from "react"

import useTemplateSetMutations from "hooks/useTemplateSetMutations"
import useTemplateOptions from "hooks/useTemplateOptions"

import Form from "components/TemplateSetCreator/DetailPane/Form"
import { TabOptions } from "ygh-ui"

const FieldForm = ({ template, field }) => {
  const { fieldTypes } = useTemplateOptions()
  const { updateEntityTemplate } = useTemplateSetMutations()

  const getInitialValues = useCallback(
    () => ({
      name: field.name,
      description: field.description,
      isSecret: field.isSecret,
      isMulti: field.type.isMulti,
      type: field.type.type,
      isFeatured:
        template.featuredField && template.featuredField.id === field.id
    }),
    [field]
  )

  const onFlush = useCallback(
    values => {
      updateEntityTemplate(template.id, {
        featuredField: values.isFeatured
          ? { connect: { id: field.id } }
          : template.featuredField
          ? { disconnect: true }
          : null,
        fields: {
          update: [
            {
              where: { id: field.id },
              data: {
                name: values.name,
                description: values.description,
                isSecret: values.isSecret,
                type: {
                  connect: {
                    id: fieldTypes.find(
                      ({ type, isMulti }) =>
                        type === values.type && isMulti === values.isMulti
                    ).id
                  }
                }
              }
            }
          ]
        }
      })
    },
    [field.id]
  )

  const onDelete = useCallback(() => {
    updateEntityTemplate(template.id, {
      fields: {
        delete: { id: field.id }
      }
    })
  }, [field.id])

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
            name: "type",
            type: "select",
            format: "horizontal",
            label: "Value type",
            component: TabOptions,
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
            block: true,
            label: "Accepts multiple values"
          }
        ],
        {
          name: "isSecret",
          type: "checkbox",
          label: "Is hidden from players"
        },
        {
          name: "isFeatured",
          type: "checkbox",
          label: "Is featured"
        }
      ]}
    />
  )
}

export default FieldForm

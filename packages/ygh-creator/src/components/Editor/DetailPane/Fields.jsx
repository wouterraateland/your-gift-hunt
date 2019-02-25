import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { UPDATE_ENTITY_INSTANCE_FIELD } from "gql/mutations"
import { useMutation } from "react-apollo-hooks"
import useDebounce from "hooks/useDebounce"

import { Input, Field } from "your-gift-hunt/ui"

const Form = styled.form`
  margin-top: 2em;
`

const getFieldValueMap = ({ fields }) =>
  fields.reduce(
    (fieldValues, { value, field: { id } }) => ({
      ...fieldValues,
      [id]: { hasChanged: false, value: JSON.parse(value) }
    }),
    {}
  )

const toInputType = type => {
  switch (type) {
    case "STRING":
      return "text"
    case "NUMBER":
      return "number"
    default:
      return type
  }
}

const FieldsForm = ({ node: { instance } }) => {
  const { fields } = instance
  const [fieldValues, setFieldValues] = useState(getFieldValueMap(instance))
  const debouncedFieldValues = useDebounce(fieldValues, 1000)
  const updateEntityInstanceField = useMutation(UPDATE_ENTITY_INSTANCE_FIELD)

  const updateFieldValue = (id, value) =>
    setFieldValues(fieldValues => ({
      ...fieldValues,
      [id]: { hasChanged: true, value }
    }))

  useEffect(
    () => {
      setFieldValues(getFieldValueMap(instance))
    },
    [instance]
  )

  useEffect(
    () => {
      Promise.all(
        Object.entries(debouncedFieldValues)
          .filter(([_, { hasChanged }]) => hasChanged)
          .map(([entityFieldId, { value }]) =>
            updateEntityInstanceField({
              variables: {
                entityInstanceFieldId: fields.find(
                  ({ field: { id } }) => id === entityFieldId
                ).id,
                value: JSON.stringify(value)
              }
            })
          )
      )
        .then(responses =>
          setFieldValues(fieldValues =>
            responses.reduce(
              (
                fieldValues,
                {
                  data: {
                    updateEntityInstanceField: {
                      field: { id }
                    }
                  }
                }
              ) => ({
                ...fieldValues,
                [id]: { ...fieldValues[id], hasChanged: false }
              }),
              fieldValues
            )
          )
        )
        .catch(e => {
          console.log(e)
        })
    },
    [debouncedFieldValues]
  )

  return (
    <Form>
      {fields
        .filter(({ field: { id } }) => fieldValues[id])
        .map(({ field: { id, type, ...field } }) => {
          if (!id) {
            return null
          }
          switch (type) {
            default:
              return (
                <Field key={`${instance.id}${id}`}>
                  <Input
                    {...field}
                    type={toInputType(type)}
                    showType
                    value={fieldValues[id].value}
                    onChange={event => updateFieldValue(id, event.target.value)}
                  />
                </Field>
              )
          }
        })}
    </Form>
  )
}

export default FieldsForm

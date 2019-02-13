import React, { useState } from "react"
import styled from "styled-components"

import { Input, Field } from "your-gift-hunt/ui"

const DetailBodyContainer = styled.div`
  padding: 2em;
`

const EntityName = styled.h2`
  margin: 0;
`

const EntityDescription = styled.p`
  margin-top: 0.5em;
`

const InstanceFieldsForm = styled.form`
  margin-top: 2em;
`

const getFieldValueMap = ({ fields }) =>
  fields.reduce(
    (fieldValues, { value, field: { id } }) => ({
      ...fieldValues,
      [id]: JSON.parse(value)
    }),
    {}
  )

const DetailBody = ({ instance }) => {
  const [fieldValues, setFieldValues] = useState(getFieldValueMap(instance))
  const { entity, fields } = instance

  const updateFieldValue = (id, value) =>
    setFieldValues(fieldValues => ({ ...fieldValues, [id]: value }))

  return (
    <DetailBodyContainer>
      <EntityName>{entity.name}</EntityName>
      <EntityDescription>{entity.description}</EntityDescription>
      <InstanceFieldsForm>
        {fields.map(({ field: { id, type, ...field } }) => {
          if (!id) {
            return null
          }
          switch (type) {
            default:
              return (
                <Field>
                  <Input
                    key={id}
                    {...field}
                    value={fieldValues[id]}
                    onChange={event => updateFieldValue(id, event.target.value)}
                  />
                </Field>
              )
          }
        })}
      </InstanceFieldsForm>
    </DetailBodyContainer>
  )
}

export default DetailBody

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { diff } from "deep-diff"

import { useFormState } from "react-use-form-state"
import { useDebounce } from "ygh-hooks"
import { useClickOutside } from "ygh-hooks"

import {
  Align,
  Button,
  DefaultOptions,
  FieldGroup,
  Float,
  Form,
  Field
} from "ygh-ui"
import { Bin, Pen } from "ygh-icons"

import DisabledSelect from "./DisabledSelect"

const LabelText = styled.span`
  display: block;
  font-size: 0.75rem;
  line-height: 1rem;

  color: ${props => props.theme.color.caption};
`

const StyledForm = styled(Form)`
  position: relative;
`

const FloatRight = styled(Float.Right)`
  position: relative;
  z-index: 1;
`

const StyledVSpace = styled.div`
  margin-bottom: 1.5rem;
  &:first-child {
    display: none;
  }
`

const Title = styled.h3`
  margin: -1rem 0;
  line-height: 1.5rem;
`

const Blockquote = styled.blockquote`
  margin: 0 0 1rem;
`

const Label = styled.div`
  position: relative;
`

const FormInput = props => {
  if (props.isHidden) {
    return null
  }
  if (props.disabled) {
    if (props.name === "name") {
      return <Title>{props.value || <em>Nameless</em>}</Title>
    }

    if (props.name === "description") {
      return props.value ? (
        <Blockquote>{props.value || <em>No description</em>}</Blockquote>
      ) : null
    }

    if (props.type === "select") {
      return <DisabledSelect {...props} />
    }

    return (
      <>
        {props.grouped && <StyledVSpace />}
        <Label>
          <LabelText>
            {props.type === "checkbox" ? props.options[0].label : props.label}
          </LabelText>
          {props.type === "checkbox" ? (
            props.checked ? (
              "True"
            ) : (
              "False"
            )
          ) : props.value === null || props.value === undefined ? (
            <em>None</em>
          ) : (
            props.value.toString()
          )}
        </Label>
      </>
    )
  }

  return <Field {...props} />
}

export default ({
  getInitialValues,
  onChange = () => {},
  onFlush,
  onDelete,
  fields
}) => {
  const ref = useRef(null)
  const [isEditable, setEditable] = useState(false)
  const [formState, inputs] = useFormState(getInitialValues())
  const initialValues = useMemo(getInitialValues, [getInitialValues])

  useClickOutside({ ref, onClickOutside: () => setEditable(false) })

  const getInputProps = useCallback(
    ({ type, name, label }) => {
      switch (type) {
        case "checkbox":
          const inputProps = inputs["checkbox"](name)
          return {
            type: "select",
            isMulti: true,
            component: DefaultOptions,
            options: [
              {
                label,
                name: "checked",
                value: true
              }
            ],
            label: "",
            ...inputProps,
            value: inputProps.checked ? [true] : []
          }
        case "selectMultiple":
          return {
            ...inputs[type](name),
            isMulti: true,
            type: "select"
          }
        case "select":
          return {
            ...inputs[type](name),
            type: "select"
          }
        case "textarea":
          return {
            ...inputs[type](name),
            type: "textarea"
          }
        default:
          return inputs[type](name)
      }
    },
    [inputs]
  )

  useEffect(() => {
    Object.keys(initialValues).forEach(name =>
      formState.setField(name, initialValues[name])
    )
  }, [initialValues])

  useEffect(() => {
    onChange(formState.values, formState.setField)
  }, [formState.values])

  const debouncedValues = useDebounce(formState.values, 1000)

  useEffect(() => {
    const difference = diff(initialValues, debouncedValues)

    if (difference) {
      onFlush(debouncedValues)
    }
  }, [debouncedValues])

  return (
    <StyledForm disabled={!isEditable} ref={ref}>
      {!isEditable && (
        <FloatRight>
          <Button
            color="error"
            size="tiny"
            importance="tertiary"
            onClick={event => {
              event.preventDefault()
              onDelete && onDelete()
            }}
          >
            <Bin /> Delete
          </Button>{" "}
          <Button
            color="primary"
            size="tiny"
            importance="tertiary"
            onClick={event => {
              event.preventDefault()
              setEditable(true)
            }}
          >
            <Pen /> Edit
          </Button>
        </FloatRight>
      )}
      {fields.map((field, i) => (
        <FieldGroup key={i} block>
          {Array.isArray(field) ? (
            field.map((f, i) => (
              <FormInput
                key={i}
                grouped
                block
                disabled={!isEditable}
                {...f}
                {...getInputProps(f)}
              />
            ))
          ) : (
            <FormInput
              block
              disabled={!isEditable}
              {...field}
              {...getInputProps(field)}
            />
          )}
        </FieldGroup>
      ))}
      {isEditable && (
        <Align.Center>
          <Button
            color="primary"
            importance="tertiary"
            size="small"
            onClick={() => setEditable(false)}
          >
            Done
          </Button>
        </Align.Center>
      )}
    </StyledForm>
  )
}

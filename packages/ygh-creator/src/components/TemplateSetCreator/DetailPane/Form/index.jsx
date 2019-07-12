import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { transparentize } from "polished"
import { diff } from "deep-diff"

import { useFormState } from "react-use-form-state"
import { useDebounce } from "ygh-hooks"
import { useClickOutside } from "ygh-hooks"

import { Align, Button, Field, Float, Form, Input } from "ygh-ui"
import { Bin, Pen } from "ygh-icons"

import DisabledSelect from "./DisabledSelect"

const LabelText = styled.span`
  pointer-events: none;

  position: absolute;
  top: -1.7em;
  left: 0;

  color: ${props => transparentize(0.2, props.theme.color.text)};

  font-size: 0.7em;

  transition: left 0.2s ease-out, top 0.2s ease-out, font-size 0.2s ease-out;
`

const StyledForm = styled(Form)`
  position: relative;
`

const FloatRight = styled(Float.Right)`
  position: relative;
  z-index: 1;
`

const StyledVSpace = styled.div`
  margin-bottom: 1.5em;
  &:first-child {
    display: none;
  }
`

const Title = styled.h3`
  margin: -1em 0;
`

const Blockquote = styled.blockquote`
  margin: -0.5em 0 1em;
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
      return <Blockquote>{props.value || <em>No description</em>}</Blockquote>
    }

    if (props.type === "select") {
      return <DisabledSelect {...props} />
    }

    return (
      <>
        {props.grouped && <StyledVSpace />}
        <Label>
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
          <LabelText label={props.label} />
        </Label>
      </>
    )
  }

  return <Input {...props} />
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
  const [formState, inputs] = useFormState(getInitialValues(), { onChange })
  const initialValues = useMemo(getInitialValues, [getInitialValues])

  useClickOutside({ ref, onClickOutside: () => setEditable(false) })

  const getInputProps = useCallback(
    ({ type, name }) => {
      switch (type) {
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
        <Field key={i} block>
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
        </Field>
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

import React, { useRef, useState } from "react"
import styled from "styled-components"

import useGameMutations from "hooks/useGameMutations"

import { useFormState } from "react-use-form-state"
import { useClickOutside } from "ygh-hooks"

import { Field, Button } from "ygh-ui"

const Form = styled.form`
  display: flex;
  align-items: flex-end;

  margin-bottom: 0.5rem;

  & > label:nth-of-type(1) {
    width: 2.5rem;
    flex-shrink: 0;
  }
  & > label:nth-of-type(2) {
    margin: 0 0.5rem;
    flex-grow: 1;
  }

  & > button {
    flex-shrink: 0;
  }
`

const HintForm = ({ actionRequirementId, onClose, hint }) => {
  const isNewHint = !hint
  const { createHint, updateHint } = useGameMutations()

  const [{ isLoading, error }, setState] = useState({
    isLoading: false,
    error: null
  })

  const [formState, { text, number }] = useFormState(
    isNewHint
      ? {
          text: "",
          delay: 0
        }
      : {
          text: hint.text,
          delay: hint.delay
        }
  )

  const ref = useRef(null)
  useClickOutside({ ref, onClickOutside: onClose })

  const onSubmit = async event => {
    event.preventDefault()

    setState(state => ({ ...state, isLoading: true }))
    try {
      await (isNewHint
        ? createHint(actionRequirementId, formState.values)
        : updateHint(hint.id, formState.values))

      setState(state => ({
        ...state,
        isLoading: false,
        error: null
      }))
      onClose()
    } catch (error) {
      setState(state => ({
        ...state,
        isLoading: false,
        error
      }))
    }
  }

  return (
    <Form onSubmit={onSubmit} ref={ref}>
      <Field
        {...number("delay")}
        type="number"
        label="Delay"
        suffix="s"
        size="small"
        min={0}
        disabled={isLoading}
      />
      <Field
        {...text("text")}
        type="textarea"
        label="Text"
        size="small"
        disabled={isLoading}
        error={error}
      />
      <Button
        size="small"
        type="submit"
        importance="primary"
        color="success"
        disabled={isLoading}
      >
        ✓
      </Button>
    </Form>
  )
}

export default HintForm

import React, { useRef, useState } from "react"
import styled from "styled-components"

import useGameMutations from "hooks/useGameMutations"

import { useFormState } from "react-use-form-state"
import useClickOutside from "hooks/useClickOutside"

import { Field, Input, Button } from "ygh-ui"

const Form = styled.form`
  margin-top: 0.25em;

  & > div:nth-child(1) {
    width: 100%;
    margin-top: -0.79em;
  }
  & > div:nth-child(2) {
    width: calc(100% - 4.4em);
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
      <Field>
        <Input
          block
          {...text("text")}
          type="textarea"
          label="Text"
          disabled={isLoading}
          error={error}
        />
      </Field>
      <Field>
        <Input
          {...number("delay")}
          type="number"
          label="Delay"
          info="in seconds"
          min={0}
          disabled={isLoading}
        />
      </Field>
      <Field>
        <Button
          size="medium"
          type="submit"
          importance="tertiary"
          color="success"
          disabled={isLoading}
        >
          ✓
        </Button>
      </Field>
    </Form>
  )
}

export default HintForm

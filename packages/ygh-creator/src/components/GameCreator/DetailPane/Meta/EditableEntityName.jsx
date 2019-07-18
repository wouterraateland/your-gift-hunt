import React, { useRef, useState, useCallback, useEffect } from "react"
import styled from "styled-components"

import useGameMutations from "hooks/useGameMutations"
import { useClickOutside } from "ygh-hooks"

import { Field, ActionButton, Button } from "ygh-ui"
import { Pen } from "ygh-icons"

const Form = styled.form`
  display: inline-block;
  width: calc(100% - 2em);
  margin: -0.4em 0 0 0;
  font-size: 1rem;
  font-family: ${props => props.theme.font.copy};
`

const StyledInput = styled(Field)`
  width: calc(100% - 2.8em);
`

const EditableEntityName = ({ entity }) => {
  const ref = useRef(null)
  const { updateEntityName } = useGameMutations()

  const [{ isEditable, isLoading, error, value }, setState] = useState({
    isEditable: false,
    isLoading: false,
    error: null,
    value: entity.name
  })

  useClickOutside({
    ref,
    onClickOutside: () => setState(state => ({ ...state, isEditable: false }))
  })

  useEffect(
    () => {
      setState({
        isEditable: false,
        isLoading: false,
        error: null,
        value: entity.name
      })
    },
    [entity]
  )

  const onEditClick = useCallback(
    () =>
      setState(state => ({ ...state, isEditable: true, value: entity.name })),
    [entity]
  )

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      setState(state => ({ ...state, isLoading: true }))
      updateEntityName(entity.id, value)
        .then(
          setState(state => ({
            ...state,
            isEditable: false,
            isLoading: false,
            error: null
          }))
        )
        .catch(err =>
          setState(state => ({ ...state, isLoading: false, error: err }))
        )
    },
    [value]
  )

  const onChange = useCallback(
    ({ target: { value } }) => setState(state => ({ ...state, value })),
    []
  )

  return isEditable ? (
    <Form onSubmit={onSubmit} ref={ref}>
      <StyledInput
        value={value}
        onChange={onChange}
        disabled={isLoading}
        error={error}
      />
      <Button
        size="medium"
        type="submit"
        importance="tertiary"
        color="success"
        disabled={isLoading}
      >
        ✓
      </Button>
    </Form>
  ) : (
    <span>
      {value}{" "}
      <ActionButton onClick={onEditClick}>
        <Pen />
      </ActionButton>
    </span>
  )
}

export default EditableEntityName

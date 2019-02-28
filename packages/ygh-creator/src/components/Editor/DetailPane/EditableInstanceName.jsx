import React, { useContext, useState, useCallback, useEffect } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import { Input, Button } from "your-gift-hunt/ui"

const EditButton = styled(Button)`
  font-size: 1rem;
  font-family: ${props => props.theme.font.copy};
  opacity: 0.5;
  span:hover > & {
    opacity: 1;
  }
`

const Form = styled.form`
  display: inline-block;
  margin: -0.4em 0 0 0;
  font-size: 1rem;
  font-family: ${props => props.theme.font.copy};
`

const EditableInstanceName = ({ instance }) => {
  const { updateInstanceName } = useContext(GameContext)

  const [{ editable, isLoading, error, value }, setState] = useState({
    editable: false,
    isLoading: false,
    error: null,
    value: instance.name
  })

  useEffect(
    () => {
      setState({
        editable: false,
        isLoading: false,
        error: null,
        value: instance.name
      })
    },
    [instance]
  )

  const onEditClick = useCallback(
    () => setState(state => ({ ...state, editable: true })),
    []
  )

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      setState(state => ({ ...state, isLoading: true }))
      updateInstanceName(instance.id, value)
        .then(
          setState(state => ({
            ...state,
            editable: false,
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

  return editable ? (
    <Form onSubmit={onSubmit}>
      <Input
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
      <EditButton
        size="small"
        importance="tertiary"
        color="accent"
        onClick={onEditClick}
      >
        Edit
      </EditButton>
    </span>
  )
}

export default EditableInstanceName

import React, {
  useRef,
  useContext,
  useState,
  useCallback,
  useEffect
} from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"
import useClickOutside from "hooks/useClickOutside"

import { Input, ActionButton, Button } from "your-gift-hunt/ui"
import { Pen } from "your-gift-hunt/icons"

const Form = styled.form`
  display: inline-block;
  margin: -0.4em 0 0 0;
  font-size: 1rem;
  font-family: ${props => props.theme.font.copy};
`

const EditableInstanceName = ({ instance }) => {
  const ref = useRef(null)
  const { updateEntityInstanceName } = useContext(GameContext)

  const [{ isEditable, isLoading, error, value }, setState] = useState({
    isEditable: false,
    isLoading: false,
    error: null,
    value: instance.name
  })

  useClickOutside({
    ref,
    onClickOutside: () =>
      setState(state => ({ ...state, isEditable: false, value: instance.name }))
  })

  useEffect(
    () => {
      setState({
        isEditable: false,
        isLoading: false,
        error: null,
        value: instance.name
      })
    },
    [instance]
  )

  const onEditClick = useCallback(
    () => setState(state => ({ ...state, isEditable: true })),
    []
  )

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      setState(state => ({ ...state, isLoading: true }))
      updateEntityInstanceName(instance.id, value)
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
      <ActionButton onClick={onEditClick}>
        <Pen />
      </ActionButton>
    </span>
  )
}

export default EditableInstanceName
import React, { useState, useCallback, useEffect } from "react"
import styled from "styled-components"

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
  const [{ editable, value }, setState] = useState({
    editable: false,
    value: instance.name
  })

  useEffect(
    () => {
      setState({
        editable: false,
        value: instance.name
      })
    },
    [instance]
  )

  const onEditClick = useCallback(
    () => setState(state => ({ ...state, editable: true })),
    []
  )

  const onSubmit = useCallback(event => {
    event.preventDefault()
    setState(state => ({ ...state, editable: false }))
  }, [])

  const onChange = useCallback(
    ({ target: { value } }) => setState(state => ({ ...state, value })),
    []
  )

  return editable ? (
    <Form onSubmit={onSubmit}>
      <Input value={value} onChange={onChange} />
      <Button size="medium" type="submit" importance="tertiary" color="success">
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

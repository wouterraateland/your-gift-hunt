import React, { useCallback, useState } from "react"
import styled from "styled-components"
import useGame from "hooks/useGame"

import { Field, Button, FieldGroup, Wrapper } from "ygh-ui"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  background-color: #f9f9f9;
`

const RequestAccess = ({ authenticate }) => {
  const [accessCode, setAccessCode] = useState("")

  const onFormSubmit = useCallback(
    event => {
      event.preventDefault()
      authenticate(accessCode)
    },
    [accessCode]
  )

  return (
    <form onSubmit={onFormSubmit}>
      <h1>This game requires an access code to play.</h1>
      <FieldGroup block>
        <Field
          label="Access code"
          value={accessCode}
          onChange={event => setAccessCode(event.target.value)}
        />
      </FieldGroup>
      <FieldGroup block>
        <Button type="submit" color="secondary" importance="primary">
          Confirm
        </Button>
      </FieldGroup>
    </form>
  )
}

const NoAccess = () => (
  <h1>
    This game is only accessible for invited people. Request a magic link from
    the creator.
  </h1>
)

const UnauthenticatedPage = () => {
  const { authenticationMethod, authenticate } = useGame()

  return (
    <Container>
      <Wrapper.Small>
        {authenticationMethod === "CODE" ? (
          <RequestAccess authenticate={authenticate} />
        ) : (
          <NoAccess />
        )}
      </Wrapper.Small>
    </Container>
  )
}

export default UnauthenticatedPage

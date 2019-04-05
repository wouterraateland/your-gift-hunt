import React, { useCallback, useContext, useState } from "react"
import styled from "styled-components"
import GameContext from "contexts/Game"

import { Input, Button, Field } from "your-gift-hunt/ui"

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
      <Field block>
        <Input
          block
          label="Access code"
          value={accessCode}
          onChange={event => setAccessCode(event.target.value)}
        />
      </Field>
      <Field block>
        <Button block type="submit" color="accent" importance="primary">
          Request Access
        </Button>
      </Field>
    </form>
  )
}

const NoAccess = () => (
  <h1>
    This game is only accessible for invited people. Request a magic link from
    the makers or play another game.
  </h1>
)

const UnauthenticatedPage = () => {
  const { authenticationMethod, authenticate } = useContext(GameContext)

  return (
    <Container>
      {authenticationMethod === "CODE" ? (
        <RequestAccess authenticate={authenticate} />
      ) : (
        <NoAccess />
      )}
    </Container>
  )
}

export default UnauthenticatedPage

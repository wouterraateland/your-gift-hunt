import React, { useCallback, useContext, useState } from "react"
import styled from "styled-components"
import GameContext from "contexts/Game"

import { Input, Button, Field, Wrapper } from "your-gift-hunt/ui"

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
      <Field block>
        <Input
          label="Access code"
          value={accessCode}
          onChange={event => setAccessCode(event.target.value)}
        />
      </Field>
      <Field block>
        <Button type="submit" color="accent" importance="primary">
          Confirm
        </Button>
      </Field>
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
  const { authenticationMethod, authenticate } = useContext(GameContext)

  return (
    <Container>
      <Wrapper medium>
        {authenticationMethod === "CODE" ? (
          <RequestAccess authenticate={authenticate} />
        ) : (
          <NoAccess />
        )}
      </Wrapper>
    </Container>
  )
}

export default UnauthenticatedPage

import React from "react"
import styled from "styled-components"

import { useFormState } from "react-use-form-state"

import Layout from "layouts/Overview"
import { Wrapper, Paper, Input, Button, Field } from "your-gift-hunt/ui"

const Title = styled.h1`
  margin-bottom: 0;
`

const Tagline = styled.p`
  margin-top: 0;
`

const Form = styled.form`
  padding: 0 1em;
`

const NewGamePage = () => {
  const [formState, { text, radio }] = useFormState()

  function onSubmit(event) {
    event.preventDefault()

    console.log(formState)
  }

  return (
    <Layout>
      <Wrapper size="large">
        <Paper>
          <Paper.Section>
            <Title>Create a new game</Title>
            <Tagline>Lets get you up and running.</Tagline>
            <Form onSubmit={onSubmit}>
              <Field block>
                <Input {...text("name")} required label="Game name" />
              </Field>
              <Field block>
                <Input
                  block
                  {...radio("privacy", "public")}
                  required
                  label="Public"
                  info="Anyone can see and play this game. You cannot use friend based puzzles."
                />
                <Input
                  block
                  {...radio("privacy", "private")}
                  required
                  label="Private"
                  info="A game made for one person. You can include friend based puzzles."
                />
              </Field>
              <Field block>
                <Button type="submit" importance="primary" color="accent">
                  Create
                </Button>
              </Field>
            </Form>
          </Paper.Section>
        </Paper>
      </Wrapper>
    </Layout>
  )
}

export default NewGamePage

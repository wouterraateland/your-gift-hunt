import React, { useCallback, useEffect, useMemo, useState } from "react"
import { navigate } from "@reach/router"
import styled from "styled-components"
import randomstring from "randomstring"
import slugify from "limax"

import { useAsync } from "ygh-hooks"
import { useFormState } from "react-use-form-state"
import { useMutation, useApolloClient } from "react-apollo-hooks"

import useAuth from "hooks/useAuth"

import Layout from "layouts/Overview"
import {
  Wrapper,
  Paper,
  Float,
  Clear,
  Field,
  Input,
  Select,
  Button
} from "ygh-ui"
import { Present } from "ygh-icons"
import BackButton from "components/BackButton"

import { USER_GAMES, GAME_COUNT_BY_SLUG } from "gql/queries"
import { CREATE_GAME } from "gql/mutations"
import { ACCESS_TYPES, PRIVACY, accessOptions, nameOptions } from "data"

const CornerDecoration = styled(Float.Right)`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    right: -1em;
    top: -1em;

    width: 20em;
    height: 11em;
    border-style: solid;
    border-width: 5.5em 10em;
    border-color: #0001 #0001 transparent transparent;
  }

  & svg {
    position: relative;
    z-index: 1;
  }
`

const Title = styled.h1`
  margin-bottom: 0;
`

const Tagline = styled.p`
  margin-top: 0;
`

const Form = styled.form`
  padding: 0 1em;
`

const Slash = styled.span`
  display: inline-block;
  margin: 0.7em 1em;

  font-weight: bold;
`

const NewGamePage = () => {
  const { user } = useAuth()
  const userSlug = user.username
  const exampleName = useMemo(
    () =>
      `${
        nameOptions.first[Math.floor(Math.random() * nameOptions.first.length)]
      } ${
        nameOptions.last[Math.floor(Math.random() * nameOptions.last.length)]
      }`,
    []
  )

  const [formState, { text, textarea, radio, select }] = useFormState({
    accessType: ACCESS_TYPES.CODE,
    accessCode: randomstring.generate(10)
  })
  const createGame = useMutation(CREATE_GAME)
  const client = useApolloClient()

  const [{ isLoading, error }, runAsync] = useAsync()
  const [nameExists, setNameExistence] = useState(false)

  if (error && !error.params) {
    throw error
  }
  const errors = {
    ...(error ? error.params : {}),
    ...(nameExists ? { name: "This name is already taken" } : {})
  }

  const checkNameExistence = useCallback(
    async name => {
      const res = await client.query({
        query: GAME_COUNT_BY_SLUG,
        variables: {
          creatorSlug: userSlug,
          gameSlug: slugify(name)
        }
      })

      return res.data.gamesConnection.aggregate.count !== 0
    },
    [client, userSlug]
  )

  useEffect(() => {
    setNameExistence(false)
    checkNameExistence(formState.values.name).then(setNameExistence)
  }, [formState.values.name])

  const onSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const gameSlug = slugify(formState.values.name)

      await createGame({
        variables: {
          name: formState.values.name,
          slug: gameSlug,
          description: formState.values.description,
          creatorId: user.id,
          privacy: formState.values.privacy,
          accessType: formState.values.accessType,
          accessCode: formState.values.accessCode
        },
        refetchQueries: [
          {
            query: USER_GAMES,
            variables: { userId: user.id, slugPrefix: "" }
          }
        ]
      })

      navigate(`/${userSlug}/game/${gameSlug}`)
    }),
    [formState.values, userSlug]
  )

  const onGenerateClick = useCallback(() => {
    formState.setField("accessCode", randomstring.generate(10))
  }, [])

  return (
    <Layout title="New game">
      <Wrapper size="large">
        <Paper fullWidthOnMobile>
          <Paper.Section>
            <Float.Left>
              <BackButton />
            </Float.Left>
            <CornerDecoration>
              <Present
                style={{
                  height: "7em",
                  marginRight: "2em",
                  marginTop: "-2em"
                }}
                boxColor="#49e"
              />
            </CornerDecoration>
            <Clear.Both style={{ marginBottom: "-3.25em" }} />
            <Title>Create a new game</Title>
            <Tagline>Lets get you up and running.</Tagline>
            <Form onSubmit={onSubmit}>
              <Field block>
                <Input label="Owner" value={userSlug} disabled />
                <Slash>/</Slash>
                <Input
                  {...text("name")}
                  required
                  label="Name"
                  info="You can always edit this"
                  error={errors.name}
                />
              </Field>
              <small>
                A good name is short and descriptive. Need some inspiration? How
                about <strong>{exampleName}</strong>?
              </small>
              <br />
              <br />
              <Field block>
                <Input
                  block
                  {...textarea("description")}
                  type="textarea"
                  label="Description"
                  info="optional"
                  error={errors.description}
                />
              </Field>
              <h2>Privacy</h2>
              <Field block>
                <Input
                  block
                  {...radio("privacy", PRIVACY.PUBLIC)}
                  required
                  label="Public"
                  info="Playable for everyone from an url and from the showcase. Can't use friend based puzzles. Free to publish."
                />
                <Input
                  block
                  {...radio("privacy", PRIVACY.PRIVATE)}
                  required
                  label="Private"
                  info="Playable for players you choose. You can include friend based puzzles. Only 5,- to publish while in Beta."
                />
              </Field>
              {formState.values.privacy === PRIVACY.PRIVATE && (
                <>
                  <br />
                  <Field block>
                    <Select
                      {...select("accessType")}
                      options={accessOptions}
                      label="Protection type"
                      info=""
                    />
                    {formState.values.accessType === ACCESS_TYPES.CODE && (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Input {...text("accessCode")} label="Password" />
                      </>
                    )}
                  </Field>
                  {formState.values.accessType === ACCESS_TYPES.CODE && (
                    <small>
                      Chose a word or sentence or{" "}
                      <u
                        style={{ cursor: "pointer" }}
                        onClick={onGenerateClick}
                      >
                        generate a random password
                      </u>
                      .
                    </small>
                  )}
                  {formState.values.accessType === ACCESS_TYPES.NONE && (
                    <small>Only people you invite can play this game.</small>
                  )}
                </>
              )}
              <Field block>
                <Float.Right>
                  <Button
                    type="submit"
                    importance="primary"
                    color="primary"
                    disabled={isLoading || nameExists}
                  >
                    Create
                  </Button>
                </Float.Right>
              </Field>
            </Form>
          </Paper.Section>
        </Paper>
      </Wrapper>
    </Layout>
  )
}

export default NewGamePage

import React, { useMemo, useState, useEffect } from "react"
import { navigate } from "@reach/router"
import styled from "styled-components"
import randomstring from "randomstring"
import slugify from "limax"

import { useFormState } from "react-use-form-state"
import { useMutation, useApolloClient } from "react-apollo-hooks"

import useUser from "hooks/useUser"

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
} from "your-gift-hunt/ui"
import Present from "components/Present"
import BackButton from "components/BackButton"
import StatusMessage from "components/StatusMessage"

import { USER_GAMES, GAME_COUNT_BY_SLUG } from "gql/queries"
import { CREATE_GAME } from "gql/mutations"
import { ACCESS_TYPES, PRIVACY, accessOptions, nameOptions } from "../data"

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
  const { user } = useUser()
  const userSlug = user.slug
  const exampleName = useMemo(
    () =>
      `${
        nameOptions.first[Math.floor(Math.random() * nameOptions.first.length)]
      } ${
        nameOptions.last[Math.floor(Math.random() * nameOptions.last.length)]
      }`,
    []
  )

  const [formState, { text, radio, select }] = useFormState({
    accessType: ACCESS_TYPES.CODE,
    accessCode: randomstring.generate(10)
  })
  const accessCodeProps = text("accessCode")
  const createGame = useMutation(CREATE_GAME)
  const client = useApolloClient()

  const [state, setState] = useState(null)
  const [nameExists, setNameExistence] = useState(false)

  async function checkNameExistence(name) {
    const res = await client.query({
      query: GAME_COUNT_BY_SLUG,
      variables: {
        creatorSlug: userSlug,
        gameSlug: slugify(name)
      }
    })

    return res.data.gamesConnection.aggregate.count !== 0
  }

  useEffect(
    () => {
      setNameExistence(false)
      checkNameExistence(formState.values.name).then(setNameExistence)
    },
    [formState.values.name]
  )

  async function onSubmit(event) {
    event.preventDefault()

    setState("loading")

    try {
      const gameSlug = slugify(formState.values.name)

      const creatorId = user.id

      await createGame({
        variables: {
          name: formState.values.name,
          slug: gameSlug,
          description: formState.values.description,
          creatorId,
          privacy: formState.values.privacy,
          accessType: formState.values.accessType,
          accessCode: formState.values.accessCode
        },
        update: (proxy, { data: { createGame } }) => {
          const query = {
            query: USER_GAMES,
            variables: { userId: creatorId, slugPrefix: "" }
          }
          const data = proxy.readQuery(query)
          user.games.push(createGame)

          proxy.writeQuery({ ...query, data })
        }
      })

      setState("success")
      navigate(`/${userSlug}/${gameSlug}`)
    } catch (error) {
      console.error(error)
      setState("error")
    }
  }

  function onGenerateClick() {
    accessCodeProps.onChange({ target: { value: randomstring.generate(10) } })
  }

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
                style={{ height: "7em", marginRight: "2em", marginTop: "-2em" }}
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
                  label="Hunt name"
                  error={nameExists ? "This name is already taken" : null}
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
                  {...text("description")}
                  label="Description"
                  info="optional"
                />
              </Field>
              <hr />
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
                  </Field>
                  {formState.values.accessType === ACCESS_TYPES.CODE && (
                    <>
                      <Field block>
                        <Input block {...accessCodeProps} label="Access code" />
                      </Field>
                      <small>
                        Chose a word or sentence that is significant to the
                        player. Or generate a{" "}
                        <u
                          style={{ cursor: "pointer" }}
                          onClick={onGenerateClick}
                        >
                          new random code
                        </u>
                        .
                      </small>
                    </>
                  )}
                </>
              )}
              <hr />
              <Field block>
                <Float.Right>
                  <Button
                    type="submit"
                    importance="primary"
                    color="primary"
                    disabled={state === "loading" || nameExists}
                  >
                    Create
                  </Button>
                  <br />
                  <StatusMessage status={state} />
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

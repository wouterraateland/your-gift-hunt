import React, { useCallback } from "react"
import styled from "styled-components"
import slugify from "limax"

import { useYGHPlayerContext } from "ygh-sdk"
import { useAsync } from "ygh-hooks"
import useAuth from "hooks/useAuth"
import useGame from "hooks/useGame"
import useGameMutations from "hooks/useGameMutations"

import { useFormState } from "react-use-form-state"
import { useQuery } from "react-apollo-hooks"

import {
  Button,
  FieldGroup,
  Float,
  Field,
  ImageInput,
  SelectOptions
} from "ygh-ui"
import StatusMessage from "components/StatusMessage"

import { accessOptions, PRIVACY, ACCESS_TYPES } from "data"
import { USER_TEMPLATE_SETS } from "gql/queries"

import defaultImage from "assets/default_thumb.png"

const Container = styled.div`
  background-color: #f9f9f9;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Head = styled.div`
  height: 2rem;
  padding: 0.5rem;
`

const Title = styled.strong`
  display: block;

  line-height: 1rem;
`

const Body = styled.div`
  overflow-x: hidden;
  overflow-y: auto;

  flex-grow: 1;
  padding: 0.5em;
`

const Footer = styled.div`
  padding: 0.5rem;
  border-top: 1px solid #0001;
`

const Form = styled.form`
  height: 100%;
  margin: 0;
`

const Tagline = styled.p`
  word-break: break-word;
`

const SettingsModal = () => {
  const { game } = useGame()
  const { user } = useAuth()
  const { updateGameSettings } = useGameMutations()
  const { updateGameImage } = useYGHPlayerContext()

  const {
    data: {
      user: { entityTemplateSetsCreated }
    }
  } = useQuery(USER_TEMPLATE_SETS, {
    variables: {
      userId: user.id
    }
  })
  const templateSetOptions = entityTemplateSetsCreated.map(({ id, name }) => ({
    value: id,
    label: name
  }))

  const [{ isLoading, error, success }, runAsync] = useAsync()
  const [formState, { text, textarea, select, selectMultiple }] = useFormState({
    image: null,
    name: game.name,
    description: game.description,
    intro: game.intro,
    outro: game.outro,
    accessType: game.accessType,
    accessCode: game.accessCode,
    entityTemplateSets: game.entityTemplateSets.map(({ id }) => id)
  })

  const handleSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const { image, entityTemplateSets, ...otherValues } = formState.values

      if (image) {
        await updateGameImage({ gameId: game.id, image })
      }

      const slug = slugify(formState.values.name)
      await updateGameSettings(game.id, {
        ...otherValues,
        entityTemplateSets: { set: entityTemplateSets.map(id => ({ id })) },
        slug
      })
    }),
    [game.id, formState.values]
  )

  if (error) {
    console.error(error)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Head>
          <Title>Settings</Title>
        </Head>
        <Body>
          <Tagline>
            Game created by{" "}
            <strong>
              {game.creator.id === user.id ? "you" : game.creator.name}
            </strong>
            .{" "}
            {game.publishedAt ? (
              <>
                Playable at{" "}
                <a href={`${process.env.REACT_APP_PLAY_URL}/${game.id}`}>
                  {process.env.REACT_APP_PLAY_URL}/{game.id}
                </a>
                .
              </>
            ) : (
              "Not published yet."
            )}
          </Tagline>
          <FieldGroup block>
            <Field block {...text("name")} label="Game name" />
          </FieldGroup>
          <FieldGroup block>
            <Field
              block
              {...textarea("description")}
              type="textarea"
              label="Description"
              info="optional"
            />
          </FieldGroup>
          <FieldGroup block>
            <Field
              block
              label="Thumbnail"
              component={ImageInput}
              placeholder={game.image || defaultImage}
              onChange={image => formState.setField("image", image)}
            />
          </FieldGroup>
          <FieldGroup block>
            <Field
              block
              {...textarea("intro")}
              type="textarea"
              label="Introduction"
              info="optional"
            />
          </FieldGroup>
          <FieldGroup block>
            <Field
              block
              {...textarea("outro")}
              type="textarea"
              label="Outro text"
              info="optional"
            />
          </FieldGroup>
          <FieldGroup block>
            <Field
              block
              {...selectMultiple("entityTemplateSets")}
              isMulti
              options={templateSetOptions}
              label="Included template sets"
              component={SelectOptions}
            />
          </FieldGroup>
          {game.privacy === PRIVACY.PRIVATE && (
            <>
              <h2>Privacy</h2>
              <FieldGroup block>
                <Field
                  label="Protection type"
                  {...select("accessType")}
                  options={accessOptions}
                  component={SelectOptions}
                />
              </FieldGroup>
              {formState.values.accessType === ACCESS_TYPES.CODE && (
                <FieldGroup block>
                  <Field block {...text("accessCode")} label="Access code" />
                </FieldGroup>
              )}
            </>
          )}
        </Body>
        <Footer>
          <Float.Right>
            <StatusMessage {...{ success, isLoading, error }} />{" "}
            <Button
              type="submit"
              importance="primary"
              color="primary"
              disabled={isLoading}
            >
              Update settings
            </Button>
          </Float.Right>
        </Footer>
      </Container>
    </Form>
  )
}

export default SettingsModal

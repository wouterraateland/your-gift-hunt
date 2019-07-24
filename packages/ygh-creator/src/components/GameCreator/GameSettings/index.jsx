import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import slugify from "limax"

import { useYGHPlayerContext } from "ygh-sdk"
import { useAsync } from "ygh-hooks"
import useAuth from "hooks/useAuth"
import useGame from "hooks/useGame"
import useGameMutations from "hooks/useGameMutations"

import { useFormState } from "react-use-form-state"
import { useQuery, useApolloClient } from "react-apollo-hooks"

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
import { USER_TEMPLATE_SETS, GAME_COUNT_BY_SLUG } from "gql/queries"

import defaultImage from "assets/default_thumb.png"

const Container = styled.div`
  background-color: #f2f2f2;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Head = styled.div`
  height: 2rem;
  padding: 0.5rem;
`

const Title = styled.span`
  display: block;

  line-height: 1rem;
  text-transform: uppercase;
`

const Body = styled.div`
  overflow-x: hidden;
  overflow-y: auto;

  flex-grow: 1;
  padding: 0.5em;
`

const Form = styled.form`
  margin: 0;
`

const Tagline = styled.p``

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

  const client = useApolloClient()
  const [nameExists, setNameExistence] = useState(false)

  const checkNameExistence = useCallback(
    async name => {
      const slug = slugify(name)

      if (slug === game.slug) {
        return false
      }

      const res = await client.query({
        query: GAME_COUNT_BY_SLUG,
        variables: {
          creatorSlug: game.creator.slug,
          gameSlug: slug
        }
      })

      return res.data.gamesConnection.aggregate.count !== 0
    },
    [client]
  )

  useEffect(() => {
    setNameExistence(false)
    checkNameExistence(formState.values.name).then(setNameExistence)
  }, [formState.values.name])

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
    <Container>
      <Head>
        <Title>Settings</Title>
      </Head>
      <Body>
        <Tagline>
          {game.name} is a{" "}
          <strong>
            {game.privacy === PRIVACY.PUBLIC ? "Public" : "Private"}
          </strong>{" "}
          game, created by{" "}
          <strong>
            {game.creator.id === user.id ? "you" : game.creator.name}
          </strong>
          .
        </Tagline>
        <Form onSubmit={handleSubmit}>
          <FieldGroup block>
            <Field
              block
              {...text("name")}
              label="Game name"
              error={nameExists ? "This name is already taken" : null}
              info={
                <>
                  Available at{" "}
                  <strong>
                    https://play.yourgifthunt.com/{game.creator.slug}/
                    {slugify(formState.values.name)}
                  </strong>
                </>
              }
            />
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
                  label="Privacy"
                  {...select("accessType")}
                  options={accessOptions}
                  label="Protection type"
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
          <FieldGroup block>
            <Float.Right>
              <StatusMessage {...{ success, isLoading, error }} />{" "}
              <Button
                type="submit"
                importance="primary"
                color="primary"
                disabled={isLoading || nameExists}
              >
                Update settings
              </Button>
            </Float.Right>
          </FieldGroup>
        </Form>
      </Body>
    </Container>
  )
}

export default SettingsModal

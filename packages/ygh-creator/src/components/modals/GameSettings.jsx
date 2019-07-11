import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import slugify from "limax"

import { useYGHPlayerContext } from "ygh-player/react-hook"
import useAsync from "hooks/useAsync"
import useAuth from "hooks/useAuth"
import useGame from "hooks/useGame"
import useGameMutations from "hooks/useGameMutations"

import { useFormState } from "react-use-form-state"
import { useQuery, useApolloClient } from "react-apollo-hooks"

import Modal from "containers/Modal"
import {
  Button,
  Column,
  Field,
  Float,
  Input,
  Paper,
  Row,
  Select
} from "your-gift-hunt/ui"
import StatusMessage from "components/StatusMessage"
import ImageInput from "components/ImageInput"

import { accessOptions, PRIVACY, ACCESS_TYPES } from "../../data"
import { USER_TEMPLATE_SETS, GAME_COUNT_BY_SLUG } from "gql/queries"

import defaultImage from "assets/default_thumb.png"

const StyledPaper = styled(Paper.Container)`
  overflow-x: hidden;
  overflow-y: auto;

  width: 45em;
  max-width: calc(100% - 2em);
  max-height: calc(100% - 2em);
`

const Form = styled.form`
  margin: 0;
`

const Title = styled.h1`
  margin: 0;
`
const Tagline = styled.p`
  margin-top: 0;
  margin-bottom: 2em;
`

const ThumbInput = styled(ImageInput)`
  padding-top: 75%;
  border-radius: ${props => props.theme.borderRadius};
`

const Small = styled.small`
  display: block;
  margin: -0.6em 0 0.5em;

  font-size: 0.7em;
  color: #0006;
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
    <Modal>
      <StyledPaper>
        <Paper.Section>
          <Title>Settings</Title>
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
            <Row vAlign="top">
              <Column size={4} mSize={12}>
                <Small>Thumbnail</Small>
                <ThumbInput
                  placeholder={game.image || defaultImage}
                  onChange={image => formState.setField("image", image)}
                />
                <br />
              </Column>
              <Column size={8} mSize={12}>
                <Field block>
                  <Input
                    block
                    {...text("name")}
                    label="Hunt name"
                    error={nameExists ? "This name is already taken" : null}
                  />
                </Field>
                <Small>
                  Available at{" "}
                  <strong>
                    https://play.yourgifthunt.com/{game.creator.slug}/
                    {slugify(formState.values.name)}
                  </strong>
                </Small>
                <br />
                <Field block>
                  <Input
                    block
                    {...textarea("description")}
                    type="textarea"
                    label="Description"
                    info="optional"
                  />
                </Field>
                <Field block>
                  <Input
                    block
                    {...textarea("intro")}
                    type="textarea"
                    label="Introduction"
                    info="optional"
                  />
                </Field>
                <Field block>
                  <Input
                    block
                    {...textarea("outro")}
                    type="textarea"
                    label="Outro text"
                    info="optional"
                  />
                </Field>
                <Field block>
                  <Select
                    block
                    {...selectMultiple("entityTemplateSets")}
                    isMulti
                    options={templateSetOptions}
                    label="Included template sets"
                  />
                </Field>
              </Column>
            </Row>
            {game.privacy === PRIVACY.PRIVATE && (
              <>
                <h2>Privacy</h2>
                <Field block>
                  <Select
                    {...select("accessType")}
                    options={accessOptions}
                    label="Protection type"
                    info=""
                  />
                </Field>
                {formState.values.accessType === ACCESS_TYPES.CODE && (
                  <Field block>
                    <Input block {...text("accessCode")} label="Access code" />
                  </Field>
                )}
              </>
            )}
            <Field block>
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
            </Field>
          </Form>
        </Paper.Section>
      </StyledPaper>
    </Modal>
  )
}

export default SettingsModal

import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback
} from "react"
import styled from "styled-components"
import slugify from "limax"

import GameContext from "contexts/Game"

import useClickOutside from "hooks/useClickOutside"
import { useFormState } from "react-use-form-state"
import { useApolloClient } from "react-apollo-hooks"

import Modal from "containers/Modal"
import { Paper, Field, Input, Select, Button } from "your-gift-hunt/ui"
import StatusMessage from "components/StatusMessage"

import { accessOptions, PRIVACY, ACCESS_TYPES } from "../../data"
import { GAME_COUNT_BY_SLUG } from "gql/queries"

const StyledPaper = styled(Paper.Container)`
  width: 45em;
  max-width: calc(100% - 2em);
`

const Form = styled.form`
  margin: 1em 0;
`

const Title = styled.h1`
  margin-bottom: 0;
`
const Tagline = styled.p`
  margin-top: 0;
  margin-bottom: 2em;
`

const SettingsModal = () => {
  const ref = useRef(null)
  useClickOutside({ ref, onClickOutside: () => window.history.back() })

  const { game, updateGameSettings } = useContext(GameContext)

  const [state, setState] = useState(null)
  const [formState, { text, select }] = useFormState({
    name: game.name,
    description: game.description,
    accessType: game.accessType,
    accessCode: game.accessCode
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

  useEffect(
    () => {
      setNameExistence(false)
      checkNameExistence(formState.values.name).then(setNameExistence)
    },
    [formState.values.name]
  )

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault()

      setState("loading")
      try {
        const slug = slugify(formState.values.name)
        await updateGameSettings(game.id, {
          ...formState.values,
          slug
        })
        setState("success")
      } catch (error) {
        console.log(error)
        setState("error")
      }
    },
    [game.id, formState.values]
  )

  return (
    <Modal>
      <StyledPaper ref={ref}>
        <Paper.Section>
          <Title>Settings for {game.name}</Title>
          <Tagline>
            <strong>
              {game.privacy === PRIVACY.PUBLIC ? "Public" : "Private"}
            </strong>{" "}
            hunt, created by <strong>{game.creator.name}</strong>.
          </Tagline>
          <Form onSubmit={handleSubmit}>
            <Field block>
              <Input
                block
                {...text("name")}
                label="Hunt name"
                error={nameExists ? "This name is already taken" : null}
              />
            </Field>
            <small>
              Available at{" "}
              <strong>
                https://play.yourgifthunt.com/{game.creator.slug}/
                {slugify(formState.values.name)}
              </strong>
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
            {game.privacy === PRIVACY.PRIVATE && (
              <>
                <hr />
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
            <hr />
            <Field block>
              <Button
                type="submit"
                importance="primary"
                color="accent"
                disabled={state === "loading" || nameExists}
              >
                Update settings
              </Button>{" "}
              <StatusMessage status={state} />
            </Field>
          </Form>
        </Paper.Section>
      </StyledPaper>
    </Modal>
  )
}

export default SettingsModal

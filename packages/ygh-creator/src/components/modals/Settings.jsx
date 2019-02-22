import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import _ from "utils"

import useClickOutside from "hooks/useClickOutside"
import { useFormState } from "react-use-form-state"
import { useMutation, useApolloClient } from "react-apollo-hooks"

import Modal from "containers/Modal"
import { Paper, Field, Input, Select, Button } from "your-gift-hunt/ui"
import StatusMessage from "components/StatusMessage"

import { accessOptions, PRIVACY, ACCESS_TYPES } from "../../data"
import { GAME_COUNT_BY_SLUG } from "gql/queries"
import { UPDATE_GAME } from "gql/mutations"

const StyledPaper = styled(Paper)`
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

const SettingsModal = ({ game }) => {
  const ref = useRef(null)
  useClickOutside({ ref, onClickOutside: () => window.history.back() })

  const [state, setState] = useState(null)
  const [formState, { text, select }] = useFormState({
    name: game.name,
    description: game.description,
    accessType: game.accessType,
    accessCode: game.accessCode
  })

  const client = useApolloClient()
  const [nameExists, setNameExistence] = useState(false)

  async function checkNameExistence(name) {
    const slug = _.toSlug(name)

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
  }

  useEffect(() => {
    setNameExistence(false)
    checkNameExistence(formState.values.name).then(setNameExistence)
  }, [formState.values.name])

  const updateGameSettings = useMutation(UPDATE_GAME)

  async function handleSubmit(event) {
    event.preventDefault()

    setState("loading")
    try {
      await updateGameSettings({
        variables: {
          gameId: game.id,
          values: {
            ...formState.values,
            slug: _.toSlug(formState.values.name)
          }
        }
      })
      setState("success")
    } catch (error) {
      console.log(error)
      setState("error")
    }
  }

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
                {formState.values.name.toLowerCase().replace(/ /g, "-")}
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
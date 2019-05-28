import React, { useState, useCallback } from "react"
import styled from "styled-components"

import useTemplateSet from "hooks/useTemplateSet"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import { useFormState } from "react-use-form-state"

import Modal from "containers/Modal"
import { Button, Field, Float, Input, Paper } from "your-gift-hunt/ui"
import StatusMessage from "components/StatusMessage"

const StyledPaper = styled(Paper.Container)`
  width: 45em;
  max-width: calc(100% - 2em);
`

const Form = styled.form`
  margin: 0;
`

const Title = styled.h1`
  margin-bottom: 0;
`
const Tagline = styled.p`
  margin-top: 0;
  margin-bottom: 2em;
`

const SettingsModal = () => {
  const { templateSet } = useTemplateSet()
  const { updateTemplateSetSettings } = useTemplateSetMutations()

  const [state, setState] = useState(null)
  const [formState, { text }] = useFormState({
    name: templateSet.name,
    description: templateSet.description
  })

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault()

      setState("loading")
      try {
        await updateTemplateSetSettings(templateSet.id, formState.values)
        setState("success")
      } catch (error) {
        console.log(error)
        setState("error")
      }
    },
    [templateSet.id, formState.values]
  )

  return (
    <Modal>
      <StyledPaper>
        <Paper.Section>
          <Title>Settings for {templateSet.name}</Title>
          <Tagline>
            Template set, created by <strong>{templateSet.creator.name}</strong>
            .
          </Tagline>
          <Form onSubmit={handleSubmit}>
            <Field block>
              <Input block {...text("name")} label="Name" />
            </Field>
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
              <Float.Right>
                <Button
                  onClick={() => window.history.back()}
                  importance="tertiary"
                  color="error"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  importance="primary"
                  color="primary"
                  disabled={state === "loading"}
                >
                  Update settings
                </Button>
                <br />
                <StatusMessage status={state} />
              </Float.Right>
            </Field>
          </Form>
        </Paper.Section>
      </StyledPaper>
    </Modal>
  )
}

export default SettingsModal

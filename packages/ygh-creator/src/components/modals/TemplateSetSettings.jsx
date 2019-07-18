import React, { useCallback } from "react"
import styled from "styled-components"

import useTemplateSet from "hooks/useTemplateSet"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import { useAsync } from "ygh-hooks"
import { useFormState } from "react-use-form-state"

import Modal from "containers/Modal"
import { Button, FieldGroup, Float, Field, Paper } from "ygh-ui"
import StatusMessage from "components/StatusMessage"

const StyledPaper = styled(Paper.Container)`
  width: 45em;
  max-width: calc(100% - 2em);
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

const SettingsModal = () => {
  const { templateSet } = useTemplateSet()
  const { updateTemplateSetSettings } = useTemplateSetMutations()

  const [{ isLoading, error, success }, runAsync] = useAsync()
  const [formState, { text, textarea }] = useFormState({
    name: templateSet.name,
    description: templateSet.description
  })

  if (error && !error.params) {
    throw error
  }

  const errors = error ? error.params : []

  const handleSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()
      if (!formState.values.name) {
        // eslint-disable-next-line no-throw-literal
        throw {
          params: {
            name: formState.values.name ? null : "Name can't be empty"
          }
        }
      }
      await updateTemplateSetSettings(templateSet.id, formState.values)
    }),
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
            <FieldGroup block>
              <Field block {...text("name")} label="Name" error={errors.name} />
            </FieldGroup>
            <FieldGroup block>
              <Field
                block
                {...textarea("description")}
                type="textarea"
                label="Description"
                info="optional"
                error={errors.description}
              />
            </FieldGroup>
            <FieldGroup block>
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
            </FieldGroup>
          </Form>
        </Paper.Section>
      </StyledPaper>
    </Modal>
  )
}

export default SettingsModal

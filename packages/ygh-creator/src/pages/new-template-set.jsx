import React, { useCallback } from "react"
import { navigate } from "@reach/router"
import styled from "styled-components"

import { useFormState } from "react-use-form-state"
import { useMutation } from "react-apollo-hooks"

import useAuth from "hooks/useAuth"
import useAsync from "hooks/useAsync"

import Layout from "layouts/Overview"
import {
  Wrapper,
  Paper,
  Float,
  Clear,
  Field,
  Input,
  Button
} from "ygh-ui"
import Present from "components/Present"
import BackButton from "components/BackButton"

import { USER_TEMPLATE_SETS } from "gql/queries"
import { CREATE_TEMPLATE_SET } from "gql/mutations"

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

const Form = styled.form`
  padding: 0 1em;
`

const NewTemplateSetPage = () => {
  const { user } = useAuth()
  const [formState, { text, textarea }] = useFormState()

  const createEntityTemplateSet = useMutation(CREATE_TEMPLATE_SET)

  const [{ isLoading, error }, runAsync] = useAsync()

  if (error && !error.params) {
    throw error
  }
  const errors = error ? error.params : []

  const onSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const { data } = await createEntityTemplateSet({
        variables: {
          values: {
            name: formState.values.name,
            description: formState.values.description,
            creator: { connect: { id: user.id } }
          }
        },
        update: (proxy, { data: { createEntityTemplateSet } }) => {
          const query = {
            query: USER_TEMPLATE_SETS,
            variables: { userId: user.id }
          }
          const data = proxy.readQuery(query)
          data.user.entityTemplateSetsCreated.push(createEntityTemplateSet)

          proxy.writeQuery({ ...query, data })
        }
      })

      navigate(
        `/${user.username}/template-set/${data.createEntityTemplateSet.id}`
      )
    }),
    [formState.values, user]
  )

  return (
    <Layout title="New template set">
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
            <Title>Create a new template set</Title>
            <br />
            <Form onSubmit={onSubmit}>
              <Field block>
                <Input
                  block
                  {...text("name")}
                  required
                  label="Name"
                  error={errors.name}
                />
              </Field>
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
              <Field block>
                <Float.Right>
                  <Button
                    type="submit"
                    importance="primary"
                    color="primary"
                    disabled={isLoading}
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

export default NewTemplateSetPage

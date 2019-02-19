import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import { useFormState } from "react-use-form-state"
import { useQuery, useMutation, useApolloClient } from "react-apollo-hooks"

import AuthContext from "contexts/Auth"

import Layout from "layouts/Overview"
import {
  Wrapper,
  Row,
  Column,
  Paper,
  Field,
  Input,
  Button
} from "your-gift-hunt/ui"
import BackButton from "components/BackButton"
import StatusMessage from "components/StatusMessage"

import { USER, USER_COUNT_BY_SLUG } from "gql/queries"
import { UPDATE_USER_SLUG } from "gql/mutations"

const Form = styled.form`
  padding: 0 1em;
`

const NewGamePage = () => {
  const [state, setState] = useState(null)
  const { user, updateUser } = useContext(AuthContext)
  const { data, error } = useQuery(USER, {
    variables: {
      userId: user.user_metadata.prismaUserId
    }
  })
  if (error) {
    throw new Error(error)
  }

  const client = useApolloClient()

  const updateUserSlug = useMutation(UPDATE_USER_SLUG)

  const [usernameExists, setUsernameExistence] = useState(false)
  const [formState, { text }] = useFormState({
    first_name: user.user_metadata.first_name,
    middle_name: user.user_metadata.middle_name,
    last_name: user.user_metadata.last_name,
    username: data.user.slug
  })

  async function checkUsernameExistence(username) {
    const res = await client.query({
      query: USER_COUNT_BY_SLUG,
      variables: {
        slug: username
      }
    })

    return res.data.usersConnection.aggregate.count !== 0
  }

  useEffect(() => {
    setUsernameExistence(false)
    checkUsernameExistence(formState.values.username).then(setUsernameExistence)
  }, [formState.values.username])

  async function onSubmit(event) {
    event.preventDefault()

    setState("loading")

    const { first_name, middle_name, last_name, username } = formState.values

    try {
      await updateUser({
        data: {
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          full_name: middle_name
            ? `${first_name} ${middle_name} ${last_name}`
            : `${first_name} ${last_name}`
        }
      })

      await updateUserSlug({
        variables: {
          userId: user.user_metadata.prismaUserId,
          slug: username
        }
      })
      setState("success")
    } catch (error) {
      console.log(error)
      setState("error")
    }
  }

  return (
    <Layout title="Profile">
      <Wrapper size="large">
        <Paper>
          <Paper.Section>
            <BackButton />
            <h1>Edit your profile</h1>
            <Form onSubmit={onSubmit}>
              <Field block>
                <Row>
                  <Column size={4} sSize={12}>
                    <Input block {...text("first_name")} label="First name" />
                  </Column>
                  <Column size={3} sSize={12}>
                    <Input block {...text("middle_name")} label="Middle name" />
                  </Column>
                  <Column size={5} sSize={12}>
                    <Input block {...text("last_name")} label="Last name" />
                  </Column>
                </Row>
              </Field>
              <hr />
              <br />
              <Field block>
                <Input
                  block
                  {...text("username")}
                  label="Username"
                  error={
                    usernameExists &&
                    formState.values.username !== data.user.slug
                      ? "This username is already taken"
                      : null
                  }
                />
              </Field>
              <small>
                https://play.yourgifthunt.com/{formState.values.username}
              </small>
              <hr />
              <Field block>
                <Button
                  type="submit"
                  importance="primary"
                  color="accent"
                  disabled={state === "loading"}
                >
                  Update profile
                </Button>{" "}
                <StatusMessage status={state} />
              </Field>
            </Form>
          </Paper.Section>
        </Paper>
      </Wrapper>
    </Layout>
  )
}

export default NewGamePage

import React, { useCallback } from "react"
import styled from "styled-components"

import { useFormState } from "react-use-form-state"
import { useMutation } from "react-apollo-hooks"
import { useYGHPlayerContext } from "ygh-player/react-hook"
import useAsync from "hooks/useAsync"
import useAuth from "hooks/useAuth"

import Layout from "layouts/Overview"
import {
  Button,
  Column,
  Field,
  Float,
  Input,
  Paper,
  Row,
  Wrapper
} from "your-gift-hunt/ui"
import BackButton from "components/BackButton"
import StatusMessage from "components/StatusMessage"
import EditableAvatar from "components/EditableAvatar"

import { UPDATE_USER_SLUG } from "gql/mutations"

const Form = styled.form`
  padding: 0 1em;
`

const ProfilePage = () => {
  const [{ isLoading, error }, runAsync] = useAsync()
  const { user } = useAuth()
  const { updateUserProfile } = useYGHPlayerContext()

  const updateUserSlug = useMutation(UPDATE_USER_SLUG)

  const [formState, { text }] = useFormState({
    avatar: null,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    email: user.email,
    username: user.username
  })

  const onSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const {
        firstName,
        middleName,
        lastName,
        email,
        username,
        avatar
      } = formState.values

      await updateUserProfile({
        firstName,
        middleName,
        lastName,
        email,
        username,
        avatar
      })

      await updateUserSlug({
        variables: {
          userId: user.id,
          slug: username
        }
      })
    }),
    []
  )

  const errors = error ? error.params : {}

  return (
    <Layout title="Profile">
      <Wrapper size="large">
        <Paper>
          <Paper.Section>
            <BackButton />
            <h1>Edit your profile</h1>
            <Form onSubmit={onSubmit}>
              <Row>
                <Column size={4} mSize={12}>
                  <EditableAvatar
                    placeholder={user.avatar}
                    onChange={avatar => formState.setField("avatar", avatar)}
                  />
                </Column>
                <Column size={8} mSize={12}>
                  <Field block>
                    <Row>
                      <Column size={4} sSize={12}>
                        <Input
                          block
                          {...text("firstName")}
                          label="First name"
                        />
                      </Column>
                      <Column size={3} sSize={12}>
                        <Input
                          block
                          {...text("middleName")}
                          label="Middle name"
                        />
                      </Column>
                      <Column size={5} sSize={12}>
                        <Input block {...text("lastName")} label="Last name" />
                      </Column>
                    </Row>
                  </Field>
                  <Field block>
                    <Input
                      block
                      {...text("email")}
                      label="Email"
                      error={errors["email"]}
                    />
                  </Field>
                  <Field block>
                    <Input
                      block
                      {...text("username")}
                      label="Username"
                      error={errors["username"]}
                    />
                  </Field>
                  <small>
                    https://play.yourgifthunt.com/{formState.values.username}
                  </small>
                </Column>
              </Row>
              <Field block>
                <Float.Right>
                  <StatusMessage
                    status={isLoading ? "loading" : error ? "error" : null}
                  />{" "}
                  <Button
                    type="submit"
                    importance="primary"
                    color="primary"
                    disabled={isLoading}
                  >
                    Update profile
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

export default ProfilePage

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

const Title = styled.h1`
  margin: 0;
`
const SubTitle = styled.h2`
  margin: 0 0 0.5em;
`

const ProfileEditForm = () => {
  const [{ isLoading, error, success }, runAsync] = useAsync()
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
    [formState.values, user.id]
  )

  const errors = error ? error.params : {}

  return (
    <Form onSubmit={onSubmit}>
      <SubTitle>Basic</SubTitle>
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
                <Input block {...text("firstName")} label="First name" />
              </Column>
              <Column size={3} sSize={12}>
                <Input block {...text("middleName")} label="Middle name" />
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
            status={
              success
                ? "success"
                : isLoading
                ? "loading"
                : error
                ? "error"
                : null
            }
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
  )
}

const PasswordEditForm = () => {
  const [{ isLoading, error, success }, runAsync] = useAsync()

  const { updateUserPassword } = useYGHPlayerContext()

  const [formState, { password }] = useFormState({
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  })

  const onSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const { currentPassword, newPassword, confirmPassword } = formState.values

      await updateUserPassword({
        currentPassword,
        newPassword,
        confirmPassword
      })

      formState.clear()
    }),
    [formState.values]
  )

  const errors = error ? error.params : {}

  return (
    <Form onSubmit={onSubmit}>
      <SubTitle>Password</SubTitle>
      <Field block>
        <Input
          block
          {...password("currentPassword")}
          label="Current password"
          error={errors["currentPassword"]}
        />
      </Field>
      <Field block>
        <Input block {...password("newPassword")} label="New password" />
      </Field>
      <Field block>
        <Input
          block
          {...password("confirmPassword")}
          label="Confirm new password"
        />
      </Field>
      <Field block>
        <Float.Right>
          <StatusMessage
            status={
              success
                ? "success"
                : isLoading
                ? "loading"
                : error
                ? "error"
                : null
            }
          />{" "}
          <Button
            type="submit"
            importance="primary"
            color="primary"
            disabled={isLoading}
          >
            Update password
          </Button>
        </Float.Right>
      </Field>
    </Form>
  )
}

const ProfilePage = () => (
  <Layout title="Profile">
    <Wrapper size="large">
      <Paper>
        <Paper.Section>
          <BackButton />
          <Title>Edit your profile</Title>
        </Paper.Section>
        <Paper.Section>
          <ProfileEditForm />
        </Paper.Section>
        <Paper.Section>
          <PasswordEditForm />
        </Paper.Section>
      </Paper>
    </Wrapper>
  </Layout>
)

export default ProfilePage

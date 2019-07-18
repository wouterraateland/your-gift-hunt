import React, { useCallback } from "react"
import styled from "styled-components"

import { useFormState } from "react-use-form-state"
import { useMutation } from "react-apollo-hooks"
import { useYGHPlayerContext } from "ygh-sdk"
import { useAsync } from "ygh-hooks"
import useAuth from "hooks/useAuth"

import Layout from "layouts/Overview"
import {
  Button,
  Column,
  FieldGroup,
  Float,
  Field,
  Paper,
  Row,
  Wrapper
} from "ygh-ui"
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
          <FieldGroup block>
            <Row>
              <Column size={4} sSize={12}>
                <Field block {...text("firstName")} label="First name" />
              </Column>
              <Column size={3} sSize={12}>
                <Field block {...text("middleName")} label="Middle name" />
              </Column>
              <Column size={5} sSize={12}>
                <Field block {...text("lastName")} label="Last name" />
              </Column>
            </Row>
          </FieldGroup>
          <FieldGroup block>
            <Field
              block
              {...text("email")}
              label="Email"
              error={errors["email"]}
            />
          </FieldGroup>
          <FieldGroup block>
            <Field
              block
              {...text("username")}
              label="Username"
              error={errors["username"]}
            />
          </FieldGroup>
          <small>
            https://play.yourgifthunt.com/{formState.values.username}
          </small>
        </Column>
      </Row>
      <FieldGroup block>
        <Float.Right>
          <StatusMessage {...{ success, isLoading, error }} />{" "}
          <Button
            type="submit"
            importance="primary"
            color="primary"
            disabled={isLoading}
          >
            Update profile
          </Button>
        </Float.Right>
      </FieldGroup>
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
      <FieldGroup block>
        <Field
          block
          {...password("currentPassword")}
          label="Current password"
          error={errors["currentPassword"]}
        />
      </FieldGroup>
      <FieldGroup block>
        <Field block {...password("newPassword")} label="New password" />
      </FieldGroup>
      <FieldGroup block>
        <Field
          block
          {...password("confirmPassword")}
          label="Confirm new password"
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
            Update password
          </Button>
        </Float.Right>
      </FieldGroup>
    </Form>
  )
}

const ProfilePage = () => (
  <Layout title="Profile">
    <Wrapper.Medium>
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
    </Wrapper.Medium>
  </Layout>
)

export default ProfilePage

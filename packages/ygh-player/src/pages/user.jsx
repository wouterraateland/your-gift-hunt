import React, { useState, useCallback } from "react"
import styled from "styled-components"

import { useQuery } from "ygh-hooks"
import { useMutation } from "ygh-hooks"
import { useYGHPlayerContext } from "ygh-sdk"
import { useFormState } from "react-use-form-state"

import Helmet from "react-helmet"
import {
  Button,
  Column,
  FieldGroup,
  Float,
  Form,
  Field,
  Loader,
  Message,
  Row,
  VSpace,
  Wrapper
} from "ygh-ui"

import NotFoundPage from "pages/404"

import Layout from "layouts/Page"
import GameThumb from "components/GameThumb"
import EditableAvatar from "components/EditableAvatar"

const Info = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.div.attrs(({ avatar }) => ({
  style: {
    backgroundImage: `url(${avatar})`
  }
}))`
  width: 8em;
  height: 8em;
  margin-right: 2em;

  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.medium};

  background: #0009 no-repeat center / cover;
`

const Meta = styled.div`
  flex-grow: 1;
`

const FloatRight = styled(Float.Right)`
  margin-top: 0.5em;
`

const Name = styled.h1`
  margin: 0;
`

const Username = styled.strong``

const UserProfileDisplay = ({ profile, canEdit, onEditClick }) => (
  <>
    <Info>
      <Avatar avatar={profile.avatar} />
      <Meta>
        {canEdit && (
          <FloatRight>
            <Button
              size="small"
              importance="primary"
              color="primary"
              onClick={onEditClick}
            >
              Edit profile
            </Button>
          </FloatRight>
        )}
        <Name>{profile.name}</Name>
        <Username>@{profile.username}</Username>
      </Meta>
    </Info>
    <h2>Rooms created ({profile.gamesCreated.length})</h2>
    <Row align="left">
      {profile.gamesCreated.map(game => (
        <Column key={game.id} size={4} mSize={6}>
          <GameThumb game={game} />
        </Column>
      ))}
    </Row>
    <h2>Rooms played ({profile.gamesPlayed.length})</h2>
    <Row align="left">
      {profile.gamesPlayed.map(game => (
        <Column key={game.id} size={4} mSize={6}>
          <GameThumb game={game} />
        </Column>
      ))}
    </Row>
  </>
)

const UserMetaForm = ({ user }) => {
  const [formState, { text, email }] = useFormState({
    avatar: null,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    email: user.email,
    username: user.username || user.slug
  })
  const { updateUserProfile } = useYGHPlayerContext()
  const [{ isLoading, error }, runMutation] = useMutation(updateUserProfile)

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()
      runMutation(formState.values)
    },
    [formState.values, runMutation]
  )

  const errors = error ? error.params : {}

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit profile</h2>
      <EditableAvatar
        placeholder={user.avatar}
        onChange={avatar => formState.setField("avatar", avatar)}
        error={errors["avatar"]}
      />
      <Row vAlign="top">
        <Column size={4}>
          <FieldGroup block>
            <Field
              block
              {...text("firstName")}
              label="First name"
              error={errors["firstName"]}
            />
          </FieldGroup>
        </Column>
        <Column size={3}>
          <FieldGroup block>
            <Field
              block
              {...text("middleName")}
              label="Middle name"
              error={errors["middleName"]}
            />
          </FieldGroup>
        </Column>
        <Column size={5}>
          <FieldGroup block>
            <Field
              block
              {...text("lastName")}
              label="Last name"
              error={errors["lastName"]}
            />
          </FieldGroup>
        </Column>
      </Row>
      <FieldGroup block>
        <Field
          block
          {...email("email")}
          label="Email address"
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
      <Float.Right>
        {error && <Message.Error>{error.message}</Message.Error>}{" "}
        <Button
          type="submit"
          color="primary"
          importance="primary"
          size="medium"
          disabled={isLoading}
        >
          Update profile
        </Button>
      </Float.Right>
    </Form>
  )
}

const PasswordForm = () => {
  const [formState, { password }] = useFormState()
  const { updateUserPassword } = useYGHPlayerContext()
  const [{ isLoading, error }, runMutation] = useMutation(updateUserPassword)

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()
      runMutation({
        currentPassword: formState.values.currentPassword || undefined,
        newPassword: formState.values.newPassword || undefined,
        confirmPassword: formState.values.confirmPassword || undefined
      })
    },
    [formState.values, runMutation]
  )

  const errors = error ? error.params : {}

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Change password</h2>
      <FieldGroup block>
        <Field
          block
          type="password"
          {...password("currentPassword")}
          label="Current password"
          error={errors["currentPassword"]}
        />
      </FieldGroup>
      <FieldGroup block>
        <Field
          block
          type="password"
          {...password("newPassword")}
          label="New password"
          error={errors["newPassword"]}
        />
      </FieldGroup>
      <FieldGroup block>
        <Field
          block
          type="password"
          {...password("confirmPassword")}
          label="Confirm new password"
          error={errors["confirmPassword"]}
        />
      </FieldGroup>
      <Float.Right>
        {error && <Message.Error>{error.message}</Message.Error>}{" "}
        <Button
          type="submit"
          color="primary"
          importance="primary"
          size="medium"
          disabled={isLoading}
        >
          Change passwords
        </Button>
      </Float.Right>
    </Form>
  )
}

const EditableUserProfile = ({ user, onBackClick }) => (
  <>
    <Button onClick={onBackClick} size="small">
      &larr; Back
    </Button>
    <UserMetaForm user={user} />
    <PasswordForm />
  </>
)

const ActiveUserProfilePage = ({ user, userProfile }) => {
  const [isEditing, setEditing] = useState(false)

  const canEdit = user && user.id === userProfile.id
  const onEditClick = useCallback(() => (canEdit ? setEditing(true) : null), [
    canEdit
  ])

  const onBackClick = useCallback(() => setEditing(false), [])

  return (
    <Layout>
      <Helmet title={`${userProfile.name} | Your Gift Hunt`} />
      <Wrapper.Small>
        <VSpace.Large />
        {isEditing ? (
          <EditableUserProfile
            user={user}
            userProfile={userProfile}
            onBackClick={onBackClick}
          />
        ) : (
          <UserProfileDisplay
            profile={userProfile}
            canEdit={canEdit}
            onEditClick={onEditClick}
          />
        )}
      </Wrapper.Small>
    </Layout>
  )
}

const UserProfilePage = ({ userSlug }) => {
  const { user, getUserProfile } = useYGHPlayerContext()
  const [{ data: userProfile, error, isLoading }] = useQuery(() =>
    getUserProfile({ userSlug })
  )

  return error ? (
    <Layout>
      <Message.Error>
        Something went wrong, please reload. (${error.message})
      </Message.Error>
    </Layout>
  ) : isLoading ? (
    <Layout>
      <Loader />
    </Layout>
  ) : userProfile ? (
    <ActiveUserProfilePage user={user} userProfile={userProfile} />
  ) : (
    <NotFoundPage />
  )
}

export default UserProfilePage

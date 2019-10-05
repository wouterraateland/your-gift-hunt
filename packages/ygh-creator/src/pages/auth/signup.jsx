import React, { useCallback, useEffect, useRef } from "react"
import { Link, navigate } from "@reach/router"
import queryString from "querystring"
import uuid from "uuid/v4"

import { useAsync } from "ygh-hooks"
import useAuth from "hooks/useAuth"

import {
  Button,
  Column,
  DefaultOptions,
  FieldGroup,
  Field,
  Row,
  VSpace
} from "ygh-ui"
import Layout from "layouts/Auth"

const SignupPage = props => {
  const { redirect = "/my-games", email } = queryString.parse(
    props.location.search.substr(1)
  )
  const emailRef = useRef(null)
  const [{ isLoading, error }, runAsync] = useAsync()
  const { registerUser } = useAuth()

  const handleSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const firstName = event.target.firstName.value
      const middleName = event.target.middleName.value
      const lastName = event.target.lastName.value
      const username = uuid()
      const email = event.target.email.value
      const password = event.target.password.value
      const shouldRemind = event.target.remind.checked

      await registerUser({
        email,
        password,
        firstName,
        middleName,
        lastName,
        username,
        shouldRemind
      })

      if (redirect) {
        navigate(redirect)
      }
    }),
    [redirect]
  )

  useEffect(() => {
    if (email && emailRef.current) {
      emailRef.current.value = email
    }
  }, [])

  if (error && !error.params) {
    throw error
  }
  const errors = error ? error.params : {}

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>Fill in your name, email address and a password to sign up.</p>
        <Row vAlign="top">
          <Column size={4}>
            <FieldGroup block>
              <Field
                block
                label="First name"
                name="firstName"
                type="text"
                required
              />
            </FieldGroup>
          </Column>
          <Column size={3}>
            <FieldGroup block>
              <Field block label="Middle name" name="middleName" type="text" />
            </FieldGroup>
          </Column>
          <Column size={5}>
            <FieldGroup block>
              <Field
                block
                label="Last name"
                name="lastName"
                type="text"
                required
              />
            </FieldGroup>
          </Column>
        </Row>
        <VSpace.Medium />
        <FieldGroup block>
          <Field
            ref={emailRef}
            block
            label="Email"
            name="email"
            type="email"
            error={errors["email"]}
            required
          />
        </FieldGroup>
        <FieldGroup block>
          <Field
            block
            label="Password"
            name="password"
            type="password"
            error={errors["password"]}
            required
          />
        </FieldGroup>
        <DefaultOptions
          block
          isMulti
          name="remind"
          options={[
            {
              value: true,
              label: "Remember me",
              info: "This will keep you logged in for 60 days."
            }
          ]}
          type="checkbox"
          error={errors["remind"]}
        />
        <FieldGroup block>
          <Button
            block
            type="submit"
            color="primary"
            importance="primary"
            disabled={isLoading}
          >
            Sign up
          </Button>
        </FieldGroup>
      </form>
      <p>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </p>
    </Layout>
  )
}

export default SignupPage

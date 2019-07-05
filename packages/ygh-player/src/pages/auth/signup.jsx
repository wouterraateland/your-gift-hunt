import React, { useCallback } from "react"
import { Link, navigate } from "@reach/router"
import queryString from "querystring"

import useMutation from "hooks/useMutation"
import useAuth from "hooks/useAuth"

import { Button, Column, Field, Input, Row, VSpace } from "your-gift-hunt/ui"
import Layout from "layouts/Auth"

const SignupPage = props => {
  const { redirect = "/" } = queryString.parse(props.location.search.substr(1))
  const { registerUser } = useAuth()
  const [{ isLoading, error }, handleSubmit] = useMutation(async event => {
    event.preventDefault()

    const firstName = event.target.firstName.value
    const middleName = event.target.middleName.value
    const lastName = event.target.lastName.value
    const username = event.target.username.value
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

    navigate(redirect)
  }, [])

  if (error && !error.params) {
    throw error
  }
  const errors = error ? error.params : {}

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>
          Fill in your name, a username, your email address and password to sign
          up.
        </p>
        <Row vAlign="top">
          <Column size={4}>
            <Field block>
              <Input
                block
                label="First name"
                name="firstName"
                type="text"
                required
              />
            </Field>
          </Column>
          <Column size={3}>
            <Field block>
              <Input block label="Middle name" name="middleName" type="text" />
            </Field>
          </Column>
          <Column size={5}>
            <Field block>
              <Input
                block
                label="Last name"
                name="lastName"
                type="text"
                required
              />
            </Field>
          </Column>
        </Row>
        <Field block>
          <Input
            block
            label="Username"
            name="username"
            type="username"
            error={errors["username"]}
            required
          />
        </Field>
        <Field block>
          <Input
            block
            label="Email"
            name="email"
            type="email"
            error={errors["email"]}
            required
          />
        </Field>
        <Field block>
          <Input
            block
            label="Password"
            name="password"
            type="password"
            error={errors["password"]}
            required
          />
        </Field>
        <Input
          block
          label="Remember me"
          info="This will keep you logged in for 60 days."
          name="remind"
          type="checkbox"
          error={errors["remind"]}
        />
        <Field block>
          <Button
            block
            type="submit"
            color="primary"
            importance="primary"
            disabled={isLoading}
          >
            Sign up
          </Button>
        </Field>
      </form>
      <p>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </p>
    </Layout>
  )
}

export default SignupPage

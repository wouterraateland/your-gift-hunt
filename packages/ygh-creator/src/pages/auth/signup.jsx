import React, { useState } from "react"
import { Link, navigate } from "@reach/router"
import queryString from "querystring"

import useAuth from "hooks/useAuth"

import { Button, Column, Field, Input, Row } from "your-gift-hunt/ui"
import Layout from "layouts/Auth"

const SignupPage = props => {
  const { redirect = "/" } = queryString.parse(props.location.search.substr(1))
  const [errors, setErrors] = useState({})
  const { registerUser } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()

    const firstName = event.target.firstName.value
    const middleName = event.target.middleName.value
    const lastName = event.target.lastName.value
    const username = event.target.username.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      await registerUser({
        email,
        password,
        firstName,
        middleName,
        lastName,
        username
      })

      navigate(redirect)
    } catch ({ params }) {
      setErrors(params)
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>Sign up with a username, your name, email address and password.</p>
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
        <Field block>
          <Button block type="submit" color="primary" importance="primary">
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

import React from "react"
import { Link, navigate } from "@reach/router"
import queryString from "querystring"

import { useMutation } from "ygh-hooks"
import useAuth from "hooks/useAuth"

import { DefaultOptions, FieldGroup, Field, Button } from "ygh-ui"
import Layout from "layouts/Auth"

const LoginPage = props => {
  const { redirect = "/" } = queryString.parse(props.location.search.substr(1))
  const { loginUser } = useAuth()

  const [{ isLoading, error }, handleSubmit] = useMutation(async event => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value
    const shouldRemind = event.target.remind.checked

    await loginUser({ email, password, shouldRemind })
    navigate(redirect)
  }, [])

  if (error && !error.params) {
    throw error
  }
  const errors = error ? error.params : {}

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>Enter your email address and password.</p>
        <FieldGroup block>
          <Field
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
        <small>
          <Link to="/auth/amnesia">Forgot your password?</Link>
        </small>
        <FieldGroup block>
          <Button
            block
            type="submit"
            color="primary"
            importance="primary"
            disabled={isLoading}
          >
            Log in
          </Button>
        </FieldGroup>
      </form>
      <p>
        Don't have an account yet? <Link to="/auth/signup">Sign up</Link>
      </p>
    </Layout>
  )
}

export default LoginPage

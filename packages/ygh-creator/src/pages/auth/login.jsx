import React, { useCallback } from "react"
import { Link, navigate } from "@reach/router"
import queryString from "querystring"

import { useAsync } from "ygh-hooks"
import useAuth from "hooks/useAuth"

import { Field, Input, Button } from "ygh-ui"
import Layout from "layouts/Auth"

const LoginPage = props => {
  const { redirect = "/" } = queryString.parse(props.location.search.substr(1))
  const { loginUser } = useAuth()

  const [{ isLoading, error }, runAsync] = useAsync()

  const handleSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const email = event.target.email.value
      const password = event.target.password.value
      const shouldRemind = event.target.remind.checked

      await loginUser({ email, password, shouldRemind })
      navigate(redirect)
    }),
    []
  )

  if (error && !error.params) {
    throw error
  }
  const errors = error ? error.params : {}

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>Enter your email address and password.</p>
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
        <br />
        <small>
          <Link to="/auth/amnesia">Forgot your password?</Link>
        </small>
        <Field block>
          <Button
            block
            type="submit"
            color="primary"
            importance="primary"
            disabled={isLoading}
          >
            Log in
          </Button>
        </Field>
      </form>
      <p>
        Don't have an account yet? <Link to="/auth/signup">Sign up</Link>
      </p>
    </Layout>
  )
}

export default LoginPage

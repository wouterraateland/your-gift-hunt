import React, { useCallback } from "react"
import { Link } from "@reach/router"

import useAuth from "hooks/useAuth"
import { useAsync } from "ygh-hooks"

import Layout from "layouts/Auth"
import { Field, Input, Button } from "ygh-ui"

const AmnesiaPage = () => {
  const { requestPasswordReset } = useAuth()
  const [{ success, isLoading, error }, runAsync] = useAsync()

  const handleSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const email = event.target.email.value
      await requestPasswordReset({ email })
    }),
    []
  )

  if (error && !error.params) {
    throw error
  }

  const errors = error ? error.params : {}

  return (
    <Layout>
      {success ? (
        <p>Check your inbox for your reset link.</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <p>
              To reset your password, enter the email address you use to sign
              in.
            </p>
            <Field block>
              <Input
                block
                label="Email"
                name="email"
                type="email"
                required
                error={errors.email}
              />
            </Field>
            <Field block>
              <Button
                block
                type="submit"
                color="primary"
                importance="primary"
                disabled={isLoading}
              >
                Get reset link
              </Button>
            </Field>
          </form>
          <p>
            Nevermind! <Link to="/auth/login">Take me back to login</Link>
          </p>
        </>
      )}
    </Layout>
  )
}

export default AmnesiaPage

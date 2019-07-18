import React, { useCallback } from "react"
import { Link } from "@reach/router"

import useAuth from "hooks/useAuth"
import { useAsync } from "ygh-hooks"

import Layout from "layouts/Auth"
import { FieldGroup, Field, Button } from "ygh-ui"

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
            <FieldGroup block>
              <Field
                block
                label="Email"
                name="email"
                type="email"
                required
                error={errors.email}
              />
            </FieldGroup>
            <FieldGroup block>
              <Button
                block
                type="submit"
                color="primary"
                importance="primary"
                disabled={isLoading}
              >
                Get reset link
              </Button>
            </FieldGroup>
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

import React, { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "@reach/router"
import queryString from "querystring"

import useAuth from "hooks/useAuth"
import { useAsync } from "ygh-hooks"

import Layout from "layouts/Auth"
import { Button, FieldGroup, Field, Loader } from "ygh-ui"

const PasswordResetPage = () => {
  const { isResetTokenValid, resetPassword } = useAuth()

  const resetToken = useRef(null)
  const [resetTokenValidity, setResetTokenValidity] = useState(null)

  const [{ isLoading, error, success }, runAsync] = useAsync()

  const handleSubmit = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const newPassword = event.target.newPassword.value
      const confirmPassword = event.target.confirmPassword.value

      await resetPassword({
        resetToken: resetToken.current,
        newPassword,
        confirmPassword
      })
    }),
    []
  )

  useEffect(() => {
    const params = queryString.decode(window.location.search.substr(1))
    window.history.replaceState({}, "", window.location.pathname)
    resetToken.current = params.resetToken
    isResetTokenValid({ resetToken: resetToken.current }).then(
      setResetTokenValidity
    )
  }, [])

  if (error && !error.params) {
    throw error
  }
  const errors = error ? error.params : {}

  return (
    <Layout>
      {resetTokenValidity === null ? (
        <Loader />
      ) : resetTokenValidity ? (
        success ? (
          <p>
            Password reset successfully!
            <br />
            Continue to <Link to="/auth/login">login</Link>.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p>Reset your password.</p>
            <FieldGroup block>
              <Field
                block
                type="password"
                required
                label="New password"
                name="newPassword"
                error={errors["newPassword"]}
              />
            </FieldGroup>
            <FieldGroup block>
              <Field
                block
                type="password"
                required
                label="Confirm password"
                name="confirmPassword"
                error={errors["confirmPassword"]}
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
                Reset password
              </Button>
            </FieldGroup>
          </form>
        )
      ) : (
        <p>
          The reset code is invalid or expired. Request a new one{" "}
          <Link to="/auth/amnesia">here</Link>.
        </p>
      )}
    </Layout>
  )
}

export default PasswordResetPage

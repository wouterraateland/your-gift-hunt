import React, { useState } from "react"
import { navigate } from "@reach/router"

import useAuth from "hooks/useAuth"

import Layout from "layouts/Auth"
import { Field, Input, Button } from "your-gift-hunt/ui"

const PasswordResetPage = () => {
  const { isLoggedIn, updateUser } = useAuth()
  const [errors, setErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()

    const password = event.target.password.value

    if (password.length < 8) {
      setErrors({ password: "Password requires at least 8 characters" })
      try {
        await updateUser({ password })
        navigate("/")
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Layout>
      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <p>Type your new password.</p>
          <Field block>
            <Input
              block
              label="New password"
              name="password"
              type="password"
              error={errors["password"]}
              required
            />
          </Field>
          <Field block>
            <Button block type="submit" color="primary" importance="primary">
              Reset password
            </Button>
          </Field>
        </form>
      ) : (
        <p>Invalid reset code.</p>
      )}
    </Layout>
  )
}

export default PasswordResetPage

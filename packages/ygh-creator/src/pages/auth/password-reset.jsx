import React, { useContext, useState, useEffect } from "react"
import * as queryString from "query-string"
import { navigate } from "@reach/router"

import AuthContext from "contexts/Auth"

import Layout from "layouts/Auth"
import { Field, Input, Button } from "your-gift-hunt/ui"

const PasswordResetPage = ({ location }) => {
  const { token } = queryString.parse(location.search)
  const { recover, updateUser } = useContext(AuthContext)
  const [isValid, setValid] = useState(false)
  const [errors, setErrors] = useState({})

  async function tryRecover(token) {
    try {
      await recover(token)
      setValid(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    tryRecover(token)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const password = event.target.newPassword.value

    try {
      await updateUser({ password })
      navigate("/")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout>
      {isValid ? (
        <form onSubmit={handleSubmit}>
          <p>Type your new password.</p>
          <Field block>
            <Input
              block
              label="New password"
              name="newPassword"
              type="password"
              error={errors["newPassword"]}
              required
            />
          </Field>
          <Field block>
            <Button block type="submit" color="accent" importance="primary">
              Reset password
            </Button>
          </Field>
        </form>
      ) : (
        <p>{errors["code"]}</p>
      )}
    </Layout>
  )
}

export default PasswordResetPage

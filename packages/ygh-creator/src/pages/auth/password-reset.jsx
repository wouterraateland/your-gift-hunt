import React, { useState, useEffect } from 'react'
import { withFirebase } from 'react-redux-firebase'

import Layout from 'layouts/Auth'
import { Field, Input, Button } from 'your-gift-hunt/ui'

const PasswordResetPage = ({ code, firebase }) => {
  const [isValid, setValid] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    firebase.auth().verifyPasswordResetCode(code)
      .then(() => setValid(true))
      .catch((e) => setErrors({ code: e.message }))
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const newPassword = event.target.newPassword.value

    try {
      const response = await firebase.auth().confirmPasswordReset(code, newPassword)
      console.log(response)
    } catch (e) {
      switch (e.code) {
        case 'auth/weak-password':
          setErrors({ newPassword: e.message }); break;
        default: console.log(e)
      }
    }
  }

  return (
    <Layout>
      {isValid
        ? (
          <form onSubmit={handleSubmit}>
            <p>Type your new password.</p>
            <Field block>
              <Input
                block
                label="New password"
                name="newPassword"
                type="password"
                error={errors['newPassword']}
                required
              />
            </Field>
            <Field block>
              <Button
                block
                type="submit"
                color="accent"
                importance="primary"
              >Reset password</Button>
            </Field>
          </form>
        )
        : <p>{errors['code']}</p>
      }
    </Layout>
  )
}

export default withFirebase(PasswordResetPage)

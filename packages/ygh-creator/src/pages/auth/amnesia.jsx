import React, { useState } from 'react'
import { Link } from '@reach/router'
import { withFirebase } from 'react-redux-firebase'

import Layout from 'layouts/Auth'
import { Field, Input, Button } from 'your-gift-hunt/ui'

const AmnesiaPage = ({ firebase }) => {
  const [isSent, setSent] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const email = event.target.email.value

    try {
      const response = await firebase.auth().sendPasswordResetEmail(email)
      console.log(response)
      setSent(true)
    } catch (e) {
      switch (e.code) {
        case 'auth/user-not-found': setSent(true); break
        default: console.log(e)
      }
    }
  }

  return (
    <Layout>
      {isSent
        ? (
          <p>Check your inbox for your reset link.</p>
        )
        : (
          <form onSubmit={handleSubmit}>
            <p>To reset your password, enter the email address you use to sign in.</p>
            <Field block>
              <Input
                block
                label="Email"
                name="email"
                type="email"
                required
              />
            </Field>
            <Field block>
              <Button
                block
                type="submit"
                color="accent"
                importance="primary"
              >Get reset link</Button>
            </Field>
          </form>
        )
      }
      <p>Nevermind! <Link to="/auth/login">Take me back to login</Link></p>
    </Layout>
  )
}

export default withFirebase(AmnesiaPage)

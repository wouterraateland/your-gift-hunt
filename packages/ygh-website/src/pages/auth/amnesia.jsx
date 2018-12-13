import React from 'react'
import auth from 'utils/auth'
import { Link } from 'gatsby'

import Layout from 'components/auth/Layout'
import { Field, Input, Button } from 'components/ui'

const AmnesiaPage = () => {
  async function handleSubmit(event) {
    event.preventDefault()

    const email = event.target.email.value

    try {
      const response = await auth.requestPasswordRecovery(email)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout>
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
      <p>Nevermind! <Link to="/auth/login">Take me back to login</Link></p>
    </Layout>
  )
}

export default AmnesiaPage

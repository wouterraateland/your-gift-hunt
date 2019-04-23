import React, { useState } from "react"
import { Link } from "@reach/router"

import useAuth from "hooks/useAuth"

import Layout from "layouts/Auth"
import { Field, Input, Button } from "your-gift-hunt/ui"

const AmnesiaPage = () => {
  const { requestPasswordRecovery } = useAuth()
  const [isSent, setSent] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const email = event.target.email.value

    try {
      await requestPasswordRecovery(email)
      setSent(true)
    } catch ({ json }) {
      if (json.code === 404) {
        setSent(true)
      } else {
        console.log(json)
      }
    }
  }

  return (
    <Layout>
      {isSent ? (
        <p>Check your inbox for your reset link.</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <p>
              To reset your password, enter the email address you use to sign
              in.
            </p>
            <Field block>
              <Input block label="Email" name="email" type="email" required />
            </Field>
            <Field block>
              <Button block type="submit" color="accent" importance="primary">
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

import React, { useState } from 'react'
import auth from 'utils/auth'
import { Link, navigate } from 'gatsby'

import Layout from 'components/auth/Layout'
import { Field, Input, Button } from 'components/ui'

const LoginPage = () => {
  const [errors, setErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      await auth.login(email, password, true)
      navigate('/creator')
    } catch (e) {
      if (e.json.error === 'invalid_grant') {
        if (e.json.error_description === 'No user found with this email') {
          setErrors({ email: e.json.error_description })
        }
        if (e.json.error_description === 'Invalid Password') {
          setErrors({ password: e.json.error_description })
        }
      }
    }
  }

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
            error={errors['email']}
            required
          />
        </Field>
        <Field block>
          <Input
            block
            label="Password"
            name="password"
            type="password"
            error={errors['password']}
            required
          />
        </Field>
        <small><Link to="/auth/amnesia">Forgot your password?</Link></small>
        <Field block>
          <Button
            block
            type="submit"
            color="accent"
            importance="primary"
          >Log in</Button>
        </Field>
      </form>
      <p>Don't have an account yet? <Link to="/auth/signup">Sign up</Link></p>
    </Layout>
  )
}

export default LoginPage

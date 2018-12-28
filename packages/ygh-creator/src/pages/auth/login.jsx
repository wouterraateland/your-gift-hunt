import React, { useState } from 'react'
import { Link, navigate } from '@reach/router'
import { withFirebase } from 'react-redux-firebase'

import { Field, Input, Button } from 'your-gift-hunt/ui'
import Layout from 'components/AuthLayout'

const LoginPage = ({ firebase }) => {
  const [errors, setErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      await firebase.login({
        email,
        password
      })
      await firebase.reloadAuth()
      navigate('/')
    } catch (e) {
      switch (e.code) {
        case 'auth/user-not-found':
          setErrors({ email: e.message }); break;
        case 'auth/wrong-password':
          setErrors({ password: e.message }); break;
        default: console.log(e)
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

export default withFirebase(LoginPage)

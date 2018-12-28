import React, { useState } from 'react'
import { Link, navigate } from '@reach/router'
import { withFirebase } from 'react-redux-firebase'

import { Field, Input, Button } from 'your-gift-hunt/ui'
import Layout from 'components/AuthLayout'

const SignupPage = ({ firebase }) => {
  const [errors, setErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()

    const first_name = event.target.first_name.value
    const middle_name = event.target.middle_name.value
    const last_name = event.target.last_name.value
    const email = event.target.email.value
    const password = event.target.password.value

    const full_name = middle_name
      ? `${first_name} ${middle_name} ${last_name}`
      : `${first_name} ${last_name}`

    try {
      await firebase.createUser(
        { email, password },
        {
          first_name,
          middle_name,
          last_name,
          full_name,
          email,
        }
      )
      await firebase.reloadAuth()

      navigate('/')
    } catch (e) {
      switch (e.code) {
        case 'auth/email-already-in-use':
        case 'auth/user-disabled':
          setErrors({ email: e.message }); break;
        case 'auth/weak-password':
          setErrors({ password: e.message }); break;
        default: console.log(e)
      }
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>Sign up with your name, email address and password.</p>
        <Field block>
          <Input
            block
            label="First name"
            name="first_name"
            type="text"
            required
          />
        </Field>
        <Field block>
          <Input
            block
            label="Middle name"
            name="middle_name"
            type="text"
          />
        </Field>
        <Field block>
          <Input
            block
            label="Last name"
            name="last_name"
            type="text"
            required
          />
        </Field>
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
        <Field block>
          <Button
            block
            type="submit"
            color="accent"
            importance="primary"
          >Sign up</Button>
        </Field>
      </form>
      <p>Already have an account? <Link to="/auth/login">Log in</Link></p>
    </Layout>
  )
}

export default withFirebase(SignupPage)

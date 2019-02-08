import React, { useState, useContext } from "react"
import { Link, navigate } from "@reach/router"

import AuthContext from "contexts/Auth"

import { Field, Input, Button } from "your-gift-hunt/ui"
import Layout from "layouts/Auth"

const SignupPage = () => {
  const [errors, setErrors] = useState({})
  const { signupUser } = useContext(AuthContext)

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
      await signupUser(email, password, {
        first_name,
        middle_name,
        last_name,
        full_name,
        email
      })

      navigate("/")
    } catch ({ json }) {
      if (json.code === 400) {
        setErrors({ email: json.msg })
      } else {
        console.log(json)
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
          <Input block label="Middle name" name="middle_name" type="text" />
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
            error={errors["email"]}
            required
          />
        </Field>
        <Field block>
          <Input
            block
            label="Password"
            name="password"
            type="password"
            error={errors["password"]}
            required
          />
        </Field>
        <Field block>
          <Button block type="submit" color="accent" importance="primary">
            Sign up
          </Button>
        </Field>
      </form>
      <p>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </p>
    </Layout>
  )
}

export default SignupPage

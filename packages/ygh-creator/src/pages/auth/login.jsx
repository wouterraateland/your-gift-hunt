import React, { useState, useContext } from "react"
import { Link, navigate } from "@reach/router"

import AuthContext from "contexts/Auth"

import { Field, Input, Button } from "your-gift-hunt/ui"
import Layout from "layouts/Auth"

const LoginPage = () => {
  const [errors, setErrors] = useState({})
  const { loginUser } = useContext(AuthContext)

  async function handleSubmit(event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      await loginUser(email, password)
    } catch ({ json: { error, error_description } }) {
      switch (error) {
        case "invalid_grant":
          setErrors({ email: error_description })
          break
        default:
          console.log(error, error_description)
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
        <small>
          <Link to="/auth/amnesia">Forgot your password?</Link>
        </small>
        <Field block>
          <Button block type="submit" color="accent" importance="primary">
            Log in
          </Button>
        </Field>
      </form>
      <p>
        Don't have an account yet? <Link to="/auth/signup">Sign up</Link>
      </p>
    </Layout>
  )
}

export default LoginPage

import React, { useState } from "react"
import { Link, navigate } from "@reach/router"
import queryString from "querystring"

import useAuth from "hooks/useAuth"

import { Field, Input, Button } from "your-gift-hunt/ui"
import Layout from "layouts/Auth"

const SignupPage = props => {
  const { redirect = "/" } = queryString.parse(props.location.search.substr(1))
  const [errors, setErrors] = useState({})
  const { signupUser } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()

    const firstName = event.target.firstName.value
    const middleName = event.target.middleName.value
    const lastName = event.target.lastName.value
    const username = event.target.username.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      await signupUser({
        email,
        password,
        firstName,
        middleName,
        lastName,
        username
      })

      navigate(redirect)
    } catch (error) {
      if (error.json) {
        if (error.json.code === 400) {
          setErrors({ email: error.json.msg })
        } else {
          console.log(error.json)
        }
      } else {
        console.log(error)
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
            name="firstName"
            type="text"
            required
          />
        </Field>
        <Field block>
          <Input block label="Middle name" name="middleName" type="text" />
        </Field>
        <Field block>
          <Input block label="Last name" name="lastName" type="text" required />
        </Field>
        <Field block>
          <Input
            block
            label="Username"
            name="username"
            type="username"
            error={errors["username"]}
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
          <Button block type="submit" color="primary" importance="primary">
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

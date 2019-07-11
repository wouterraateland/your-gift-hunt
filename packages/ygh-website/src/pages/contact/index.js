import React, { useState } from "react"
import { navigate } from "gatsby-link"

import Layout from "components/Layout"
import {
  Button,
  Column,
  Field,
  Float,
  Input,
  Row,
  Section,
  Wrapper
} from "ygh-ui"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactPage = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value

    setValues(values => ({
      ...values,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...values
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  return (
    <Layout>
      <Section>
        <Wrapper medium>
          <h1>Contact</h1>
          <form
            name="contact"
            method="post"
            action="/contact/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <Row vAlign="top">
              <Column size={6} mSize={12}>
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </div>
                <Field block>
                  <Input
                    block
                    label="Your name"
                    name="name"
                    required
                    onChange={handleChange}
                    value={values["name"]}
                  />
                </Field>
                <Field block>
                  <Input
                    block
                    label="Your email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    value={values["email"]}
                  />
                </Field>
                <Field block>
                  <Input
                    block
                    label="Subject"
                    name="subject"
                    required
                    onChange={handleChange}
                    value={values["subject"]}
                  />
                </Field>
              </Column>
              <Column size={6} mSize={12}>
                <Field block>
                  <Input
                    block
                    type="textarea"
                    label="How can we help you?"
                    name="message"
                    required
                    onChange={handleChange}
                    value={values["message"]}
                    style={{ height: "11.25em" }}
                  />
                </Field>
                <Field block>
                  <Float.Right>
                    <Button color="accent" importance="primary" type="submit">
                      Send Message
                    </Button>
                  </Float.Right>
                </Field>
              </Column>
            </Row>
          </form>
        </Wrapper>
      </Section>
    </Layout>
  )
}

export default ContactPage

import React, { useState } from "react"
import styled from "styled-components"

import MailchimpSubscribe from "react-mailchimp-subscribe"
import { Field, Button } from "ygh-ui"

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  text-align: left;

  & button {
    margin-left: 1rem;
  }
`

const MAILCHIMP_SUBSCRIBE_URL =
  "https://yourgifthunt.us19.list-manage.com/subscribe/post?u=309a27bcdbc1a2943a6081ffb&id=c073769b3b"

const MailchimpForm = ({ status, message, subscribe }) => {
  const [email, setEmail] = useState("")

  function handleOnSubmit(event) {
    event.preventDefault()

    subscribe({ EMAIL: email })
  }

  return status === "success" ? (
    <div dangerouslySetInnerHTML={{ __html: message }} />
  ) : (
    <Form disabled={status === "sending"} onSubmit={handleOnSubmit}>
      <Field
        label="Your email address"
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <Button importance="primary" color="primary" type="submit">
        Subscribe
      </Button>
      {status === "error" && (
        <div dangerouslySetInnerHTML={{ __html: message }} />
      )}
    </Form>
  )
}

export default () => (
  <MailchimpSubscribe
    url={MAILCHIMP_SUBSCRIBE_URL}
    render={props => <MailchimpForm {...props} />}
  />
)

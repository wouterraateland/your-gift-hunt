import React, { useCallback, useState } from "react"

import MailchimpSubscribe from "react-mailchimp-subscribe"
import { Field, Button, FieldGroup } from "ygh-ui"

const MAILCHIMP_SUBSCRIBE_URL =
  "https://yourgifthunt.us19.list-manage.com/subscribe/post?u=309a27bcdbc1a2943a6081ffb&id=c073769b3b"

const MailchimpForm = ({ status, message, subscribe }) => {
  const [email, setEmail] = useState("")

  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault()

      subscribe({ EMAIL: email })
    },
    [email, subscribe]
  )

  return status === "success" ? (
    <div dangerouslySetInnerHTML={{ __html: message }} />
  ) : (
    <form disabled={status === "sending"} onSubmit={handleOnSubmit}>
      <FieldGroup>
        <Field
          label="Your email address"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </FieldGroup>
      <FieldGroup>
        <Button importance="primary" color="primary" type="submit">
          Subscribe
        </Button>
      </FieldGroup>
      {status === "error" && (
        <div dangerouslySetInnerHTML={{ __html: message }} />
      )}
    </form>
  )
}

export default () => (
  <MailchimpSubscribe
    url={MAILCHIMP_SUBSCRIBE_URL}
    render={props => <MailchimpForm {...props} />}
  />
)

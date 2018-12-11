import React, { useState } from 'react'

import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { Input, Button, Field } from 'components/ui'

const url = 'https://yourgifthunt.us19.list-manage.com/subscribe/post?u=309a27bcdbc1a2943a6081ffb&id=c073769b3b'

const MailchimpForm = ({ status, message, subscribe }) => {
  const [email, setEmail] = useState('')

  function handleOnSubmit(event) {
    event.preventDefault()

    subscribe({ EMAIL: email })
  }

  return status === 'success'
    ? <div dangerouslySetInnerHTML={{ __html: message }} />
    : (
      <form
        disabled={status === 'sending'}
        onSubmit={handleOnSubmit}
      >
        <Field>
          <Input
            label="you@example.com"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Field>
        <Field>
          <Button
            importance="primary"
            color="accent"
            type="submit"
          >Subscribe</Button>
        </Field>
        {status === 'error' &&
          <div dangerouslySetInnerHTML={{ __html: message }} />
        }
      </form>
    )
}

export default () => (
  <MailchimpSubscribe
    url={url}
    render={props => <MailchimpForm {...props} />}
  />
)

import React, { useState } from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

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
        <p>Subscribe to our newsletter to stay up to date on the newest of the newest.</p>
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button type="submit">Subscribe</button>
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

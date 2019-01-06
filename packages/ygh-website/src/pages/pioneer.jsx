import React from 'react'

import { Wrapper } from 'components/ui'
import Layout from 'components/landing/Layout'
import MailchimpForm from 'components/MailchimpForm'

const NotFoundPage = () => (
  <Layout>
    <Wrapper>
      <h1>Hi Pioneer, no hunt here yet.</h1>
      <p>Check back next week to be the first to play.</p>

      <h2>Or</h2>
      <p>Sign op to the newsletter and we'll let you know when the hunt is ready to play</p>
      <MailchimpForm />
    </Wrapper>
  </Layout>
)

export default NotFoundPage

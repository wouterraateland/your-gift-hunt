import React from 'react'
import * as queryString from 'query-string'

import PasswordResetPage from './password-reset'
import NotFoundPage from 'pages/404'

const ActionPage = ({ location }) => {
  const { mode, oobCode } = queryString.parse(location.search)

  switch (mode) {
    case 'resetPassword': return <PasswordResetPage code={oobCode} />
    default: return <NotFoundPage />
  }
}

export default ActionPage

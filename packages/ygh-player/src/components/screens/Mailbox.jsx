import React from 'react'
import styled from 'styled-components'

const Mailbox = styled.div`

`

const MailboxScreen = ({ isOpen }) => {
  return (
    <Mailbox isOpen={isOpen} />
  )
}

export default MailboxScreen

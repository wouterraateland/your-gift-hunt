import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const MailboxPart = styled(PhysicalObject.Part)`

`

const Mailbox = props => (
  <PhysicalObject width="2em" height="2em">
    <MailboxPart {...props} z={2} />
  </PhysicalObject>
)

export default Mailbox

export const objectId = 'mailbox'

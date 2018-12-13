import React from 'react'
import styled from 'styled-components'

import { Link } from 'gatsby'

import { Button } from 'components/ui'
import Path from 'components/icons/Path'

const StyledPath = styled(Path)`
  margin: -.25em 0;
`

export default () => (
  <Button
    importance="primary"
    color="accent"
    as={Link}
    to="/demo"
  >
    <StyledPath size={1.5} />&nbsp;&nbsp;Play a Demo Hunt
  </Button>
)

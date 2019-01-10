import React, { useContext } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from '@reach/router'

import AuthContext from 'contexts/Auth'

import { Edit } from 'your-gift-hunt/icons'
import Menu from 'components/Menu'

const StyledHuntThumb = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;

  &:nth-child(2n) {
    background-color: #0001;
  }
`

const HuntTitle = styled.h2`
  width: 50%;
  margin: 0;
`

const HuntMeta = styled.p`
  margin: 0;
`

const MoreActions = ({ projectId, slug }) => (
  <Menu.Container>
    <Menu.Toggle />
    <Menu>
      <Menu.Item>Test</Menu.Item>
    </Menu>
  </Menu.Container>
)

const EditProject = styled(Link)`
  position: relative;
  width: 2em;
  height: 2em;
  padding: .25em .675em;
`

const StyledHuntThumbActions = styled.div`
  display: flex;
`

const HuntThumbActions = ({ projectId, slug }) => (
  <StyledHuntThumbActions>
    <MoreActions projectId={projectId} slug={slug} />
    <EditProject to={`/edit/${slug}`}>
      <Edit size={1.5} />
    </EditProject>
  </StyledHuntThumbActions>
)

const HuntThumb = ({ id, meta, slug, creator }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <StyledHuntThumb>
      <HuntTitle>{meta.name}</HuntTitle>
      <HuntMeta>
        <strong>
          Created by
          {' '}
          {creator.id === currentUser.uid
            ? 'you'
            : creator.name}
        </strong>
        <br />
        Last edited {moment(meta.updatedAt.toDate()).fromNow()}
      </HuntMeta>
      <HuntThumbActions projectId={id} slug={slug} />
    </StyledHuntThumb>
  )
}

export default HuntThumb

import React from 'react'
import styled from 'styled-components'

const PuzzleTemplate = styled.div`

`

const Header = styled.div`
  background-color: #efd9ff;
  border-radius: .5em;
`

const Icon = styled.img`
  display: inline-block;
  width: 4em;
  margin-bottom: 0;
`

const Title = styled.h3`
  margin: 0;
  padding: .5em;
`

const Body = styled.div`
  padding: .5em;
`

export default ({ icon, title, exerpt="" }) => {
  return (
    <PuzzleTemplate>
      <Header>
        <Icon src={icon} alt={title} />
        <Title>{title}</Title>
      </Header>
      <Body>
        <p>{exerpt}</p>
      </Body>
    </PuzzleTemplate>
  )
}

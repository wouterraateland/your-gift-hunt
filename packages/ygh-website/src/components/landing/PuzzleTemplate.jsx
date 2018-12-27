import React from 'react'
import styled, { css } from 'styled-components'

const PuzzleTemplate = styled.div`
  position: relative;

  padding: 1em;
  margin-bottom: 4em;
  border-radius: ${props => props.theme.borderRadius};

  background-color: #3f51b5;
  color: #fffc;

  p {
    margin: 0;
  }
`

const Title = styled.h3`
  margin-bottom: .5em;

  color: #fff;
`

export default ({ icon: Icon, title, exerpt="" }) => {
  const LeftIcon = styled(Icon)`
    position: relative;

    margin-bottom: 1em;

    color: #fff;
    background-color: #366dc7;
    box-shadow: -1em .5em 1.5em -.5em #0004;

    transform-origin: left;
    transform: skewY(-30deg) scale(.82, 1);
  `

  const Background = styled(Icon)`
    opacity: .15;

    position: absolute;
    top: 50%;
    left: calc(100% - 4em);

    transform: translate(-50%, -50%);
  `

  return (
    <PuzzleTemplate>
      <LeftIcon size={4} />
      <Background size={12} />
      <Title>{title}</Title>
      <p>{exerpt}</p>
    </PuzzleTemplate>
  )
}

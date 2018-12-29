import React from 'react'
import styled from 'styled-components'
import { withFirebase } from 'react-redux-firebase'
import { Link } from '@reach/router'

const StyledProfile = styled.div`
  position: relative;
`

const Avatar = styled.div`
  width: 3em;
  height: 3em;

  border-radius: 100%;

  background: ${props => props.theme.color.text} url(${props => props.src}) no-repeat center / cover;
`

const Menu = styled.div`
  position: absolute;
  right: 0; top: 4em;
  z-index: 3;

  width: 16em;

  box-shadow: 0 0 60em 60em #0000;

  background: #fff;

  transform-origin: 90% 0;
  transform: scale(0);

  transition:
    transform .2s .2s ease-out,
    box-shadow .2s 0s ease-out;

  &::before,
  &::after {
    content: '';

    position: absolute;
    display: block;
  }

  &::before {
    position: absolute;
    left: 0; top: -2em;
    right: 0; bottom: 100%;
  }

  &::after {
    right: 1.25em;
    top: -.25em;

    width: .7em;
    height: .7em;

    border-style: solid;
    border-width: .35em;
    border-color: #fff transparent transparent #fff;
    border-top-left-radius: .125em;

    transform: rotate(45deg);
  }

  ${StyledProfile}:hover & {
    box-shadow: 0 0 60em 60em #0004;

    transform: scale(1);

    transition:
      transform .2s 0s ease-out,
      box-shadow 1s .2s ease-out;
  }
`

const MenuItem = styled.div`
  cursor: pointer;
  
  display: block;
  padding: 1em;

  text-decoration: none;

  &:nth-child(2n) {
    background: #0001;
  }
`

const Profile = ({ firebase }) => {
  return (
    <StyledProfile>
      <Avatar src={null} />
      <Menu>
        <MenuItem as={Link} to="/profile">Profile</MenuItem>
        <MenuItem onClick={() => firebase.logout()}>Log out</MenuItem>
      </Menu>
    </StyledProfile>
  )
}

export default withFirebase(Profile)

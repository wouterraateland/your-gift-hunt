import styled from 'styled-components'

const Safe = styled.div`
  position: relative;

  width: 16em;
  height: 16em;
  border-radius: 1em;

  box-shadow:
    inset .25em .25em .5em 0 #fff4,
    inset -.25em -.25em .5em 0 #0004;

  background-image: linear-gradient(#263238, #263238 1em, transparent 1em, transparent 15em, #263238 15em, #263238);
  background-color: #37474f;
  color: #fff;
`

export default Safe

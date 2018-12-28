import styled from 'styled-components'

const Paper = styled.div`
  position: relative;

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 .5em 1.5em -.5em #0004;
  
  background: #fff;
`

export default Paper

import styled from 'styled-components'

export const PaperSection = styled.div`
  padding: 1em;
`

export const Paper = styled.div`
  position: relative;

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 .5em 1.5em -.5em #0004;

  background: #fff;
`

Paper.Section = PaperSection

export default Paper

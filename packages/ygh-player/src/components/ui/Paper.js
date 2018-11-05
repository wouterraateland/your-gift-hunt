import styled from 'styled-components'

const PaperSection = styled.div`
  padding: 1em;

  & + & {
    border-top: 1px solid rgba(0, 0, 0, .05);
  }
`

PaperSection.displayName = 'PaperSection'

const Paper = styled.div`
  border-radius: .5em;

  box-shadow: 0 .5em 1.5em -.5em rgba(0, 0, 0, .2);

  background-color: rgba(255, 255, 255, .9);
  color: #000;
`

Paper.displayName = 'Paper'
Paper.Section = PaperSection

export default Paper

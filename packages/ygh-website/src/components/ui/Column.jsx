import styled from 'styled-components'

const Column = styled.div`
  display: block;
  float: left;
  padding-left: ${props => props.theme.columns.gap};
  padding-right: ${props => props.theme.columns.gap};

  width: ${props => 100 * props.size / props.theme.columns.count}%;

  @media (max-width: 480px) {
    width: ${props => 100 * props.sSize / props.theme.columns.count}%;
  }
  @media (max-width: 720px) {
    width: ${props => 100 * props.mSize / props.theme.columns.count}%;
  }
  @media (max-width: 1080px) {
    width: ${props => 100 * props.lSize / props.theme.columns.count}%;
  }
`

export default Column

import styled from "styled-components"

const BaseWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;

  flex-grow: 1;
`

const TinyWrapper = styled(BaseWrapper)`
  max-width: 30rem;
`

const SmallWrapper = styled(BaseWrapper)`
  max-width: 45rem;
`

const MediumWrapper = styled(BaseWrapper)`
  max-width: 60rem;
`

const LargeWrapper = styled(BaseWrapper)`
  max-width: 75rem;
`

const Wrapper = styled(BaseWrapper)`
  max-width: ${props => props.width}rem;
`

Wrapper.Tiny = TinyWrapper
Wrapper.Small = SmallWrapper
Wrapper.Medium = MediumWrapper
Wrapper.Large = LargeWrapper

export default Wrapper

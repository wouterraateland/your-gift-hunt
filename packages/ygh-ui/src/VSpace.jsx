import styled from "styled-components"

export const Small = styled.div`
  clear: both;
  margin-bottom: 0.5em;
`
Small.displayName = "SmallVSpace"

export const Medium = styled.div`
  clear: both;
  margin-bottom: 1em;
`
Medium.displayName = "MediumVSpace"

export const Large = styled.div`
  clear: both;
  margin-bottom: 2em;
`
Large.displayName = "LargeVSpace"

export const XLarge = styled.div`
  clear: both;
  margin-bottom: 4em;
`
XLarge.displayName = "XLargeVSpace"

export const VSpace = styled.div`
  clear: both;
  margin-bottom: ${props => props.height}em;
`
VSpace.displayName = "VSpace"

VSpace.Small = Small
VSpace.Medium = Medium
VSpace.Large = Large
VSpace.XLarge = XLarge

export default VSpace

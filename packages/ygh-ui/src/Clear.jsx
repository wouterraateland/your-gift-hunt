import styled from "styled-components"

export const ClearBoth = styled.div`
  clear: both;
`
ClearBoth.displayName = "ClearBoth"

export const ClearLeft = styled.div`
  clear: left;
`
ClearLeft.displayName = "ClearLeft"

export const ClearNone = styled.div`
  clear: none;
`
ClearNone.displayName = "ClearNone"

export const ClearRight = styled.div`
  clear: right;
`
ClearRight.displayName = "ClearRight"

export const Clear = styled.div`
  clear: inherit;
`
Clear.displayName = "Clear"

Clear.Both = ClearBoth
Clear.Left = ClearLeft
Clear.None = ClearNone
Clear.Right = ClearRight

export default Clear

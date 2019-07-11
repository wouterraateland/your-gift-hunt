import styled from "styled-components"

export const Small = styled.div`
  @media (max-width: 30em) {
    display: none;
  }
`
export const Medium = styled.div`
  @media (max-width: 45em) {
    display: none;
  }
`
export const Large = styled.div`
  @media (max-width: 64em) {
    display: none;
  }
`

export const NotSmall = styled.div`
  @media (min-width: 30em) {
    display: none;
  }
`
export const NotMedium = styled.div`
  @media (min-width: 45em) {
    display: none;
  }
`
export const NotLarge = styled.div`
  @media (min-width: 64em) {
    display: none;
  }
`

const Hide = {
  Small,
  Medium,
  Large,
  Not: { Small: NotSmall, Medium: NotMedium, Large: NotLarge }
}

export default Hide

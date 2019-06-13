import React from "react"
import styled from "styled-components"

const Container = styled.span`
  & span {
    cursor: pointer;
  }

  &:not(:hover) span.empty {
    filter: grayscale(100%);
  }

  &:hover {
    & span:hover ~ span {
      filter: grayscale(100%);
    }
  }
`

const Rating = ({ rating = 0, onRate }) => (
  <Container>
    {[1, 2, 3, 4, 5].map(x => (
      <span
        key={x}
        className={rating >= x ? "filled" : "empty"}
        onClick={() => onRate(x)}
        role="img"
        aria-label={`${x} star${x === 1 ? "" : "s"}`}
      >
        ⭐️
      </span>
    ))}
  </Container>
)

export default Rating

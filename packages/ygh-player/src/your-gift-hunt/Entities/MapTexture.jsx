import styled from "styled-components"

const MapTexture = styled.div.attrs(({ size }) => ({
  style: {
    left: `${size === 2 ? 3 : 1}em`,
    top: `${size === 2 ? 3 : 1}em`,
    transform: `scale(${size}) translate(-50%, -50%)`
  }
}))`
  position: absolute;

  width: 2em;
  height: 2em;

  background-color: #f0e4cb;
  clip-path: polygon(
    40% 28%,
    37% 45%,
    23% 65%,
    42% 62%,
    35% 67%,
    18% 68%,
    14% 78%,
    31% 82%,
    31% 77%,
    24% 73%,
    42% 71%,
    61% 80%,
    59% 94%,
    66% 93%,
    68% 78%,
    71% 71%,
    63% 60%,
    80% 57%,
    85% 42%,
    77% 39%,
    84% 33%,
    86% 26%,
    84% 14%,
    70% 11%,
    54% 18%,
    55% 28%,
    63% 35%,
    62% 40%,
    57% 37%,
    50% 42%,
    54% 46%,
    58% 43%,
    53% 50%,
    45% 45%,
    46% 36%,
    51% 33%,
    46% 23%
  );
`
MapTexture.defaultProps = {
  size: 1
}

export default MapTexture

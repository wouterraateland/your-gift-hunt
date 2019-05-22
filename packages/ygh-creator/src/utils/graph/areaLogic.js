import { compose } from "utils/functions"

export const completeArea = compose(
  edges => ({
    ...edges,
    centerX: (edges.left + edges.right) / 2,
    centerY: (edges.top + edges.bottom) / 2,
    width: edges.right - edges.left,
    height: edges.bottom - edges.top
  }),
  ({ top, left, bottom, right, centerX, centerY, width, height }) => ({
    top:
      top !== undefined
        ? top
        : bottom !== undefined
        ? bottom - height
        : centerY - height / 2,
    left:
      left !== undefined
        ? left
        : right !== undefined
        ? right - width
        : centerX - width / 2,
    bottom:
      bottom !== undefined
        ? bottom
        : top !== undefined
        ? top + height
        : centerY + height / 2,
    right:
      right !== undefined
        ? right
        : left !== undefined
        ? left + width
        : centerX + width / 2
  })
)

const overlaps = a => b =>
  a.centerX - b.centerX < (a.width + b.width + 2) / 2 &&
  a.centerY - b.centerY < (a.height + b.height + 2) / 2

const spiralGenerator = function*(step = 1, origin = { x: 0, y: 0 }) {
  let x = origin.x
  let y = origin.y
  let d = step
  let m = step / 2

  while (true) {
    while (x * d < m) {
      yield { x, y }
      x += d
    }
    while (y * d < m) {
      yield { x, y }
      y += d
    }
    d *= -1
    m += step / 2
  }
}

const calcCenterOfGravity = (areas = []) => {
  if (areas.length === 0) {
    return { x: 0, y: 0 }
  }

  const weight = areas.reduce(
    (acc, { width, height }) => acc + width * height,
    0
  )

  return {
    x: Math.round(
      areas.reduce(
        (acc, { centerX, width, height }) => acc + centerX * width * height,
        0
      ) / weight
    ),
    y: Math.round(
      areas.reduce(
        (acc, { centerY, width, height }) => acc + centerY * width * height,
        0
      ) / weight
    )
  }
}

export const findEmptyArea = (
  { width, height },
  adjacentAreas,
  preferedLocation
) => {
  const { x, y } = preferedLocation || calcCenterOfGravity(adjacentAreas)

  let center = {
    x: x + (width % 2) / 2,
    y: y + (height % 2) / 2
  }
  const generator = spiralGenerator(1, center)

  while (
    adjacentAreas.some(
      overlaps({ centerX: center.x, centerY: center.y, width, height })
    )
  ) {
    center = generator.next().value
  }

  return {
    centerX: center.x,
    centerY: center.y
  }
}

export default {
  completeArea,
  findEmptyArea
}

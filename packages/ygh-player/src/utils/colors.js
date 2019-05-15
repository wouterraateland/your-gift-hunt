import * as polished from "polished"
import { pipe, flip } from "utils/functions"

export const darken = amount => color =>
  pipe(
    polished.parseToHsl,
    ({ hue }) => (hue > 180 ? 1 : -1),
    direction => 360 + direction * amount * 100,
    flip(polished.adjustHue)(color),
    polished.darken(amount)
  )(color)

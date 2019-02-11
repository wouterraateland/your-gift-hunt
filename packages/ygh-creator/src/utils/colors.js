import * as polished from "polished"
import S from "sanctuary"

export const darken = amount => color =>
  S.pipe([
    polished.parseToHsl,
    ({ hue }) => (hue > 180 ? 1 : -1),
    direction => 360 + direction * amount * 100,
    S.flip(polished.adjustHue)(color),
    polished.darken(amount)
  ])(color)

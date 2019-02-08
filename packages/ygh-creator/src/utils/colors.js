import * as polished from "polished"
import { Identity } from "utils/functionals"

export const darken = (amount, color) => {
  const { hue } = polished.parseToHsl(color)
  const direction = hue > 180 ? 1 : -1

  return Identity(color)
    .map(c => polished.adjustHue(360 + direction * amount * 100, c))
    .map(c => polished.darken(amount, c))
    .value()
}

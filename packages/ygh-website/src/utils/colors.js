import * as polished from "polished"
import _ from "./functions"

export const darken = amount => color =>
  _.pipe(
    polished.parseToHsl,
    ({ hue }) => (hue > 180 ? 1 : -1),
    direction => 360 + direction * amount * 100,
    _.flip(polished.adjustHue)(color),
    polished.darken(amount)
  )(color)

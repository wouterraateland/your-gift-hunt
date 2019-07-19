import Social from "./Social"
import UI from "./UI"

export * from "./Social"
export * from "./UI"

import Logo from "./Logo"
import Present from "./Present"
import Icon from "./Icon"

export { Social, UI, Logo, Present, Icon }

export default {
  ...Social,
  ...UI,
  Logo,
  Present,
  Icon
}

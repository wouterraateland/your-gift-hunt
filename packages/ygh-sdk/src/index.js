import YGHPlayer from "./YGHPlayer"
import YGHPlayerWeb from "./YGHPlayerWeb"
import useYGHPlayer from "./useYGHPlayer"
import useYGHPlayerContext, {
  YGHPlayerContext,
  YGHPlayerProvider
} from "./YGHPlayerContext"

import { createUseAction, createInputAction } from "./actionCreators"
import ACTION_TYPES from "./actionTypes"

export default YGHPlayer

export {
  createUseAction,
  createInputAction,
  ACTION_TYPES,
  YGHPlayer,
  YGHPlayerWeb,
  useYGHPlayer,
  YGHPlayerContext,
  YGHPlayerProvider,
  useYGHPlayerContext
}

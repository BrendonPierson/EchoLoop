import { actions as A } from './app_actions'
import { Map } from 'immutable'

export default function(state = new Map(), action) {
  const handlers = {
    [A.TOGGLE_SIDE_NAV]: () => state.update('sideNavOpen', false, (s) => !s),
  }
  return handlers.hasOwnProperty(action.type) ? handlers[action.type]() : state
}

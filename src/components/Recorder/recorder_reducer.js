import { actions as A } from './recorder_actions'
import { Map } from 'immutable'

export default function(state = new Map(), action) {
  const handlers = {
    [A.START_BACKGROUND_RECORDING]: () => state.set('backgroundRecording', true),
    [A.STOP_RECORDING]: () => state.set('backgroundRecording', false)
                                   .set('foregroundRecording', false)
                                   .set('duration', action.duration)
                                   .set('audioUrl', action.audioUrl),
    [A.START_FOREGROUND_RECORDING]: () => state.set('foregroundRecording', true)
                                               .set('duration', action.duration),
    [A.SAVE_RECORDING]: () => new Map(),
  }
  return handlers.hasOwnProperty(action.type) ? handlers[action.type]() : state
}

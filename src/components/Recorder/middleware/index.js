import RecorderManager from './recorder_manager'
const trailingInterval = 45 * 1000
const recorderManager = new RecorderManager(trailingInterval)

export const recorderMiddleware = store => next => action => {
  if(action.subType === 'recorder') {
    const result = recorderManager[action.recorderAction]()
    action.duration = recorderManager.duration
    action.audioUrl = result && result.type === 'audioUrl' ? result.body : null
  }
  return next(action)
}

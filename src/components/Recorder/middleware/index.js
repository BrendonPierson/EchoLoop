import RecorderManager from './recorder_manager'
const trailingInterval = 45 * 1000
const recorderManager = new RecorderManager(trailingInterval)

export const recorderMiddleware = store => next => action => {
  if(action.subType === 'recorder') {
    recorderManager[action.recorderAction]()
    action.duration = recorderManager.duration
  }
  return next(action)
}

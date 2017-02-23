export const actions = {
  START_BACKGROUND_RECORDING: 'START_BACKGROUND_RECORDING',
  START_FOREGROUND_RECORDING: 'START_FOREGROUND_RECORDING',
  STOP_RECORDING: 'STOP_RECORDING',
  SAVE_RECORDING: 'SAVE_RECORDING',
}

export const creators = {
  startBackgroundRecording: () => ({
    type: actions.START_BACKGROUND_RECORDING,
    subType: 'recorder',
    recorderAction: 'startBackgroundRecording',
  }),
  startForegroundRecording: () => ({
    type: actions.START_FOREGROUND_RECORDING,
    subType: 'recorder',
    recorderAction: 'startForegroundRecording',
  }),
  stopRecording: () => ({
    type: actions.STOP_RECORDING,
    subType: 'recorder',
    recorderAction: 'stopRecording',
  }),
  saveRecording: () => ({
    type: actions.SAVE_RECORDING,
    subType: 'recorder',
    recorderAction: 'download',
  }),
}

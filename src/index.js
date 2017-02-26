/* @flow */
import RecorderManager from './recorder_manager'

const
  trailingInterval = 5 * 1000,
  recorderManager = new RecorderManager(trailingInterval),
  start = document.getElementById('startRecordingBtn'),
  save = document.getElementById('saveRecordingBtn'),
  status = document.getElementById('status')

start.onclick = function() {
  recorderManager.startForegroundRecording()
}

save.onclick = () => recorderManager.download()
const setStatus = (text /* :string */) => status.innerHTML = text

recorderManager.startBackgroundRecording()

setInterval(() => setStatus(`Current Recorded Duration: ${Math.floor(recorderManager.duration)}`), 1000)

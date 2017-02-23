/* @flow */
import RecorderManager from './recorder_manager'

const
  trailingInterval = 45 * 1000,
  recorderManager = new RecorderManager(trailingInterval),
  bgRecordBtnStart = document.getElementById('bgRecordBtnStart'),
  bgRecordBtnStop = document.getElementById('bgRecordBtnStop'),
  fgRecordBtnStart = document.getElementById('fgRecordBtnStart'),
  saveBtn = document.getElementById('saveBtn')

bgRecordBtnStart.disabled = false
bgRecordBtnStop.disabled = true
fgRecordBtnStart.disabled = true
saveBtn.disabled = true

bgRecordBtnStart.onclick = function() {
  recorderManager.startBackgroundRecording()
  this.disabled = true
  bgRecordBtnStop.disabled = false
  fgRecordBtnStart.disabled = false
}

bgRecordBtnStop.onclick = function() {
  recorderManager.stopBackgroundRecording()
  this.disabled = true
  fgRecordBtnStart.disabled = true
  bgRecordBtnStart.disabled = false
  saveBtn.disabled = false
}

fgRecordBtnStart.onclick = function() {
  recorderManager.startForegroundRecording()
  this.disabled = true
  bgRecordBtnStop.disabled = false
}

saveBtn.onclick = () => recorderManager.download()

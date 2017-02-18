/* @flow */
import Recorder from './recorder'

export default class RecorderManager {
  constructor(trailingInterval /* :number */) {
    this.nextUp = 'recorderA'
    this.trailingInterval = trailingInterval
  }
  get duration() /* :number*/ {
    if(!this.recorderB)
      return this.recorderA.duration
    return Math.max(this.recorderA.duration, this.recorderB.duration)
  }

  startBackgroundRecording = () => {
    window.navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        this.stream = stream
        // $FlowFixMe: suppressing this error until we can refactor
        this[this.nextUp] = new Recorder(this.stream)
        // $FlowFixMe: suppressing this error until we can refactor
        this[this.nextUp].start()
        this._whosNext()
        this._startBackgroundInterval()
      })
  }

  startForegroundRecording = () => {
    clearInterval(this.intervalId)
    console.log('this.recorderA, this.recorderB',
    this.recorderA, this.recorderB)
    if(this.recorderB && this.recorderB.length > this.recorderA.length)
      return this.recorderA.stop()
    return this.recorderB ? this.recorderB.stop() : null
  }

  stopBackgroundRecording = () => {
    this.recorderA.stop()
    if(this.recorderB)
      this.recorderB.stop()
    clearInterval(this.intervalId)
  }

  download = () => {
    const blob =  this._getBlob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style.display = 'none'
    a.href = url
    a.download = `${Date.now()}_chunk.webm`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  _startBackgroundInterval = () => {
    this.intervalId = setInterval(() => {
      // $FlowFixMe: suppressing this error until we can refactor
      this[this.nextUp] = new Recorder(this.stream)
      // $FlowFixMe: suppressing this error until we can refactor
      this[this.nextUp].start()
      this._whosNext()
    }, this.trailingInterval)
  }

  _getBlob() {
    if(!this.recorderB || this.recorderA.length > this.recorderB.length)
      return this.recorderA.blob
    return this.recorderB.blob
  }

  _whosNext = () => {
    this.nextUp = this.nextUp === 'recorderA' ? 'recorderB' : 'recorderA'
  }
  /*flow-include nextUp :string*/
  /*flow-include trailingInterval :number*/
  /*flow-include recorderA :Recorder*/
  /*flow-include recorderB :Recorder*/
  /*flow-include stream :MediaStream*/
  /*flow-include stream :MediaStream*/
  /*flow-include intervalId :number*/
}

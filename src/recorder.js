/* @flow */
const audioConfig = { 'type' : 'audio/ogg codecs=opus' }

export default class Recorder {
  constructor(stream /* :MediaStream */) {
    this.chunks = []
    // $FlowFixMe: suppressing this error until we can refactor
    this.mediaRecorder = new MediaRecorder(stream)
    this.mediaRecorder.ondataaggvailable = this.incomingData
  }
  get length()/*:number*/{ return this.chunks.length }
  get blob()/*:Blob*/{ return new Blob(this.chunks, audioConfig) }
  get state()/*:string*/{ return this.mediaRecorder.state }
  get duration()/*:number*/{ return (new Date() - this.startTime) / 1000 }

  start = () => {
    this.mediaRecorder.start()
    this.startTime = new Date()
  }
  pause = () => this.mediaRecorder.pause()
  resume = () => this.mediaRecorder.resume()
  stop = () => {
    if(this.mediaRecorder.state !== 'inactive')
      this.mediaRecorder.stop()
  }
  incomingData = ({ data } /* :Object */) => this.chunks.push(data)
  onStop = () => console.log("Stopped.")
  /* flow-include chunks :Array<Blob>*/
  /* flow-include mediaRecorder :Object*/
  /* flow-include startTime :Date*/
  /* flow-include recorderB :Recorder*/
  /* flow-include stream :MediaStream*/
  /* flow-include stream :MediaStream*/
  /* flow-include intervalId :number*/

}

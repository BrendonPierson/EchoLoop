import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { creators as C } from './recorder_actions'

const style = {
  margin: 12,
}

class Recorder extends Component {
  render() {
    const {
      backgroundRecording,
      foregroundRecording,
      startBackgroundRecording,
      startForegroundRecording,
      stopRecording,
      saveRecording,
      duration,
      audioUrl,
    }  = this.props
    return (
      <div>
        <h3>Minimum Interval Loop: 45s</h3>
        <h3>Background Recording: { backgroundRecording ? 'True' : 'False' }</h3>
        <h3>Foreground Recording: { foregroundRecording ? 'True' : 'False' }</h3>
        <h3>Duration: { duration }s</h3>
        <RaisedButton
          disabled={backgroundRecording}
          onTouchTap={startBackgroundRecording}
          label="Start Background Recording" style={style} />
        <RaisedButton
          disabled={!backgroundRecording}
          onTouchTap={stopRecording}
          label="Stop" primary={true} style={style} />
        <RaisedButton
          disabled={foregroundRecording || !backgroundRecording}
          onTouchTap={startForegroundRecording}
          label="Record" secondary={true} style={style} />
        <RaisedButton
          disabled={duration === 0 || backgroundRecording}
          onTouchTap={saveRecording}
          label="Save" secondary={true} style={style} />
        <div>
          <audio controls src={audioUrl}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  backgroundRecording: state.getIn(['recorder', 'backgroundRecording'], false),
  foregroundRecording: state.getIn(['recorder', 'foregroundRecording'], false),
  duration: state.getIn(['recorder', 'duration'], 0),
  audioUrl: state.getIn(['recorder', 'audioUrl']),
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  startBackgroundRecording: () => dispatch(C.startBackgroundRecording()),
  startForegroundRecording: () => dispatch(C.startForegroundRecording()),
  stopRecording: () => dispatch(C.stopRecording()),
  saveRecording: () => dispatch(C.saveRecording()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Recorder)

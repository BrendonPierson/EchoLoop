import { combineReducers } from 'redux-immutable'
import { createStore, applyMiddleware } from 'redux'
import { Map } from 'immutable'
import createLogger from 'redux-logger'
import app from './components/App/app_reducer'
import recorder from './components/Recorder/recorder_reducer'
import { recorderMiddleware } from './components/Recorder/middleware'

const initialState = new Map()
const logger = createLogger({ stateTransformer: s => s.toJS() })
const rootReducer = combineReducers({
  app,
  recorder
})
export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(recorderMiddleware, logger),
)

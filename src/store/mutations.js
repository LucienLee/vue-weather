import STATUS from '../utils/requestStatus'

export const state = {
  getPositionStatus: STATUS.LOADING,
  getWOEIDStatus: STATUS.LOADING,
  getWeatherStatus: STATUS.LOADING,
  woeid: '',
  coords: {},
  weather: {}
}

export const mutations = {
  SET_POSITION_SUCCESS (state, coords) {
    state.getPositionStatus = STATUS.SUCCESSFUL
    state.coords.latitude = coords.latitude
    state.coords.longitude = coords.longitude
  },
  SET_POSITION_FAIL () {
    state.getPositionStatus = STATUS.FAILED
  },
  SET_WOEID_SUCCESS (state, woied) {
    state.getWOEIDStatus = STATUS.SUCCESSFUL
    state.woeid = woied
  },
  SET_WOEID_FAIL (state) {
    state.getWOEIDStatus = STATUS.FAILED
  },
  SET_WEATHER_SUCCESS (state, weather) {
    state.getWeatherStatus = STATUS.SUCCESSFUL
    state.weather = weather
  },
  SET_WEATHER_FAIL (state) {
    state.getWeatherStatus = STATUS.FAILED
  }
}

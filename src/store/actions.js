import axios from 'axios'

const yahooAPIURL = 'http://query.yahooapis.com/v1/public/yql'

export const getPosition = ({ commit }) => {
  let isLoadedFromNavigator = true

  return new Promise((resolve, reject) => {
    // Load coordinates from navigator
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        commit('SET_POSITION_SUCCESS', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        resolve()
      }, (err) => {
        console.error(err)
        isLoadedFromNavigator = false
      })
    }

    // Fallback to load Load coordinates from ip
    if (!navigator.geolocation || !isLoadedFromNavigator) {
      axios.get('//freegeoip.net/json/')
      .then((res) => {
        commit('SET_POSITION_SUCCESS', {
          latitude: res.latitude,
          longitude: res.longitude
        })
        resolve()
      })
      .catch((err) => {
        console.error(err)
        commit('SET_POSITION_FAIL')
        reject()
      })
    }
  })
}

export const getWOEIDByCoordinates = ({ commit }, coords) => {
  return axios.get('/', {
    baseURL: yahooAPIURL,
    params: {
      q: `SELECT woeid FROM geo.places WHERE text="(${coords.latitude}, ${coords.longitude})"`,
      format: 'json'
    }
  })
    .then((res) => {
      commit('SET_WOEID_SUCCESS', res.data.query.results.place.woeid)
      return res.data.query.results.place.woeid
    })
    .catch((err) => {
      console.error(err)
      commit('SET_WOEID_FAIL')
    })
}

export const getWeatherByWOEID = ({ commit }, woeid) => {
  return axios.get('/', {
    baseURL: yahooAPIURL,
    params: {
      q: `SELECT * from weather.forecast where woeid="${woeid}"`,
      format: 'json'
    }
  })
    .then((res) => {
      commit('SET_WEATHER_SUCCESS', res.data.query.results)
      return res.data.query.results
    })
    .catch((err) => {
      console.error(err)
      commit('SET_WEATHER_FAIL')
    })
}

export const getWeatherByCoordinates = ({ dispatch, commit }, coords) => {
  return dispatch('getWOEIDByCoordinates', coords)
    .then((woeid) => {
      return dispatch('getWeatherByWOEID', woeid)
    })
}

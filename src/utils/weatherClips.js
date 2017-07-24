/*
  Weather Code: https://developer.yahoo.com/weather/documentation.html
  Video Source: http://www.coverr.co/
*/

const files = {
  0: 'Dodge-Tornado', // tornado
  28: 'Cloudy-water', // day-cloudy
  29: 'Big-Apple', // night-cloudy
  30: 'Cloudy-water', // day-cloudy
  32: 'Tulum' // day-sunny
}

function getClipsPaths (file) {
  const path = '/static/clips'
  return [`${path}/${file}.mp4`, `${path}/${file}.webm`, `${path}/${file}.jpg`]
}

export {
  files,
  getClipsPaths
}

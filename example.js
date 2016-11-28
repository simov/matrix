
// returns a random integer between min (inclusive) and max (inclusive)
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

var example = {

  container: 'matrix', // container id
  interval: 100, // data arrival - for non live sources
  speed: 44, // draw speed - defaults to 44

  range: {
    cyrillic: {from: 1024, to: 1279},
    bg: {from: 1072, to: 1103},
    arabic: {from: 1536, to: 1643}
  },

  alphabet: {
    // generate random string
    string: () => {
      var max = 55
      var length = Math.floor(Math.random() * max) + 1
      var message = Math.random().toString(36).substring(length)
      return message
    },

    // random messages from array
    array: () => {
      var messages = [
        'Wow Amazing', 'Something Really Clever', 'That\'s interesting idd'
      ]
      return random(0, messages.length)
    },

    // alphabet range
    range: (range) => {
      var max = 55
      var length = Math.floor(Math.random() * max) + 1
      var message = ''
      for (var i=0; i < length; i++) {
        message += String.fromCharCode(random(range.from, range.to))
      }
      return message
    },

    // live twitter feed
    live: (add) => {
      // https://www.pubnub.com/developers/realtime-data-streams/twitter-stream/
      pubnub.subscribe({
        channel: 'pubnub-twitter',
        message: (message) => add(message.text)
      })
      // see the initialization in index.js
    }
  },

  initial: {
    // static message
    static: () => {
      return 'Something Really Clever!'
    },

    // array of messages
    array: () => {
      var messages = [
        'Wow Amazing', 'Something Really Clever', 'That\'s interesting idd'
      ]
      return messages[random(0, messages.length)]
    },

    // random message containing only 0 and 1
    zerone: () => {
      var max = 55
      var length = Math.floor(Math.random() * max) + 1
      var message = ''
      for (var i=0; i < length; i++) {
        message += random(0, 1)
      }
      return message
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {


  var add, interval
  // global :trollface:
  pubnub = PUBNUB.init({
    subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe',
    ssl: true
  })

  var tests = [
    {
      name: 'random string',
      run: () => {
        interval = setInterval(() => {
          add(example.alphabet.string())
        }, example.interval)
      }
    },

    {
      name: 'custom alphabet - cyrillic',
      run: () => {
        interval = setInterval(() => {
          add(example.alphabet.range(example.range.cyrillic))
        }, example.interval)
      }
    },

    {
      name: 'custom alphabet - bg',
      run: () => {
        interval = setInterval(() => {
          add(example.alphabet.range(example.range.bg))
        }, example.interval)
      }
    },

    {
      name: 'custom alphabet - arabic',
      run: () => {
        interval = setInterval(() => {
          add(example.alphabet.range(example.range.arabic))
        }, example.interval)
      }
    },

    {
      name: 'live source - twitter',
      run: () => {
        example.alphabet.live(add)
      }
    },

    {
      name: 'random string / initial message - static',
      run: () => {
        interval = setInterval(() => {
          add(example.alphabet.string(), example.initial.static())
        }, example.interval)
      }
    },

    {
      name: 'custom alphabet - bg / initial message - random 0 and 1',
      run: () => {
        interval = setInterval(() => {
          add(example.alphabet.range(example.range.bg), example.initial.zerone())
        }, example.interval)
      }
    },

    {
      name: 'random string / initial message - from array',
      run: () => {
        interval = setInterval(() => {
          add(example.alphabet.string(), example.initial.array())
        }, example.interval)
      }
    }
  ]

  // select
  function init (e) {
    // remove container
    var container = document.querySelector('#' + example.container)
    if (container) {
      // stop drawing
      add(null, null, true)
      // stop pushing data
      clearInterval(interval)
      // unsubscribe from live data
      pubnub.unsubscribe({
        channel: 'pubnub-twitter'
      })
      // remove container
      document.body.removeChild(container)
    }
    // add container
    var canvas = document.createElement('canvas')
    canvas.id = example.container
    document.body.appendChild(canvas)

    // initialize the matrix
    add = matrix(example.container, example.speed)
    // run test
    tests[e.target.value].run()
  }
  m.mount(document.querySelector('#examples'), {
    view: (vnode) =>
      m('select', {onchange: init}, tests.map((test, index) =>
        m('option', {value: index}, test.name)
      ))
  })

  init({target: {value: 0}})
})

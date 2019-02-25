helpers = {
  // the Fisher-Yates (aka Knuth) Shuffle https://github.com/Daplie/knuth-shuffle
  shuffle: function(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }
}

router = {
  initRoutes: function() {
    routie('insultlist', () => {
      api.getAll().then(data => render.drawList(data))
    })
    routie(':id', id => {
      api.getDetails(id).then(data => render.drawDetail(data[id]))
    })
    routie('insultlist')
  }
}

api = {
  getAll: function() {
    return Promise.all([this.loadNames, this.loadInsults])
  },
  getDetails: function() {
    return this.loadNames
  },
  loadInsults: new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest()
    const link = 'https://api.whatdoestrumpthink.com/api/v1/quotes'
    request.open('GET', link, true)

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = JSON.parse(request.responseText)
        resolve(data.messages.personalized)
      } else {
        // We reached our target server, but it returned an err
        reject(error)
      }
    }

    request.onerror = () => {
      // There was a connection error of some sort
    }

    request.send()
  }),
  loadNames: new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest()
    const linkNames = 'https://randomuser.me/api/?results=573'
    request.open('GET', linkNames, true)

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = JSON.parse(request.responseText)
        // const randomNames = []
        // data.results.forEach(element => {
        //   randomNames.push(element.name.first)
        // })
        const users = data.results.map(user => ({
          name:
            user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1),
          lastName:
            user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1),
          title: user.name.title,
          email: user.email,
          cellphone: user.cell,
          gender: user.gender,
          picture: user.picture,
          location: user.location
        }))
        resolve(users)
      } else {
        // We reached our target server, but it returned an error
        reject(error)
      }
    }

    request.onerror = () => {
      // There was a connection error of some sort
    }

    request.send()
  })
}

render = {
  drawDetail: function(user) {
    const list = document.getElementById('list')
    // while (list.firstChild && list.removeChild(list.firstChild))
    //   var user = document.createElement('div')
    // var node = document.createTextNode('This is a new paragraph.')
    // user.appendChild(node)
    // list.appendChild(user)

    list.innerHTML = `<div class="user">
     <a href="#insultlist">Back to list</a>
          <img class="profilepic" src=${user.picture.large}></img>
        <p>${user.name} ${user.lastName}</p>
        <p>${user.insult}</p>
        <p>Phone number: <a href="tel:${user.cellphone}"> ${
      user.cellphone
    }</a></p>
        <p>Directly insult this user via email: </p>
        <a href="mailto:${user.email}?subject=${user.name} ${user.insult}">${
      user.email
    }</a>
        </div>
        `
    this.drawMap(user.location.coordinates)
  },
  drawList: function(data) {
    const element = document.getElementById('list')
    const names = data[0]
    const insults = helpers.shuffle(data[1])
    for (let i = 0; i < insults.length; i++) {
      names[i].insult = insults[i]
      names[i].id = i
    }
    element.innerHTML = `
  <a href="./index.html">Give me some other insults!</a>
  ${names
    .map(item =>
      `
  <div class="name">
  <p>${item.name} ${item.insult}</p>
  <a href="#${item.id}">
  Check out how to contact this user
  </a>
  </div>
  `.trim()
    )
    .join('')}`
  },
  drawMap: function(location) {
    map = document.getElementById('list')
    map.innerHTML += `
  <p>Find this person to tell him/her in person: </p>
<div class="map" id="map"></div>
`
    initMap(location)
  }
}

router.initRoutes()

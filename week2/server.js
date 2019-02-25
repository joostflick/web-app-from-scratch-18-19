// the Fisher-Yates (aka Knuth) Shuffle https://github.com/Daplie/knuth-shuffle
function shuffle(array) {
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

//promises example by Joost Faber https://codepen.io/joostf/pen/OQxpxx
const loadInsults = new Promise(function(resolve, reject) {
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
})

const loadNames = new Promise(function(resolve, reject) {
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

Promise.all([loadNames, loadInsults]).then(function(values) {
  routie('insultlist', () => {
    drawDom(values)
  })
  routie(':id', id => {
    drawDetailPage(values[0][id])
  })
})

//Martijn was a huge inspiration for me here

// no innerhtml
function drawDetailPage(user) {
  const element = document.getElementById('list')
  element.innerHTML = `<div class="user">
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
  console.log(user.location.coordinates)
  drawMap(user.location.coordinates)
}

function drawMap(location) {
  console.log(location)
  map = document.getElementById('list')
  map.innerHTML += `
  <p>Find this person to tell him/her in person: </p>
<div class="map" id="map"></div>
`
  initMap(location)
}

function drawDom(data) {
  const element = document.getElementById('list')
  const names = data[0]
  const insults = shuffle(data[1])
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
}

routie('insultlist')

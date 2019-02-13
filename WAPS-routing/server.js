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
  routie('insultList', () => {
    drawDom(values)
  })
  routie(':id', id => {
    drawDetailPage(values[0][id])
  })
})

function drawDetailPage(user) {
  const element = document.getElementById('list')
  console.log(user)
  element.innerHTML = `<div class="user">
        <img src=${user.picture.large}></img>
      <p>${user.name} ${user.lastName}</p>
      <p>${user.insult}</p>
      <p>${user.cellphone}</p>
      <a href="mailto:${user.email}?subject=${user.name}+${user.insult}">${
    user.email
  }</p>
      </div>
      `
}

function drawDom(data) {
  const element = document.getElementById('list')
  const names = data[0]
  const insults = data[1]
  for (let i = 0; i < insults.length; i++) {
    names[i].insult = insults[i]
    names[i].id = i
  }
  element.innerHTML = `${names
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

routie('insultList')

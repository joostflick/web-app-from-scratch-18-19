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
        name: user.name.first,
        lastName: user.name.last,
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
  createTable(values)
})

function createTable(values) {
  const names = values[0]
  const insults = values[1]
  console.log(names)
  console.log(values)

  document.getElementById('insult').innerHTML =
    'Insulting ' + insults.length + ' people Donald Trump style'

  // get the reference for the body
  const body = document.getElementsByTagName('body')[0]

  // creates a <table> element and a <tbody> element
  const tbl = document.createElement('table')
  const tblBody = document.createElement('tbody')
  // creating all cells
  for (let i = 0; i < insults.length; i++) {
    // creates a table row
    const row = document.createElement('tr')

    // Create a <td> element and a text node, make the text
    // node the contents of the <td>, and put the <td> at
    // the end of the table row
    const cell = document.createElement('td')
    const cellText = document.createTextNode(
      names[i].name.charAt(0).toUpperCase() +
        names[i].name.slice(1) +
        ' ' +
        insults[i]
    )
    cell.appendChild(cellText)
    row.appendChild(cell)

    // add the row to the end of the table body
    tblBody.appendChild(row)
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody)
  // appends <table> into <body>
  body.appendChild(tbl)
  // sets the border attribute of tbl to 2;
  tbl.setAttribute('border', '2')
}

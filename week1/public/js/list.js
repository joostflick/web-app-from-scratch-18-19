var link = 'https://api.whatdoestrumpthink.com/api/v1/quotes'
var linkNames = 'https://randomuser.me/api/?results=573'

var loadInsults = new Promise(function(resolve, reject) {
  var request = new XMLHttpRequest()
  request.open('GET', link, true)

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const data = JSON.parse(request.responseText)
      resolve(data.messages.personalized)
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

var loadNames = new Promise(function(resolve, reject) {
  var request = new XMLHttpRequest()
  request.open('GET', linkNames, true)

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const data = JSON.parse(request.responseText)
      var randomNames = []
      data.results.forEach(element => {
        randomNames.push(element.name.first)
      })
      resolve(randomNames)
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
  var names = values[0]
  var insults = values[1]
  console.log(names)
  console.log(values)

  document.getElementById('insult').innerHTML =
    'Insulting ' + insults.length + ' people Donald Trump style'

  // get the reference for the body
  var body = document.getElementsByTagName('body')[0]

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement('table')
  var tblBody = document.createElement('tbody')
  // creating all cells
  for (var i = 0; i < insults.length; i++) {
    // creates a table row
    var row = document.createElement('tr')

    // Create a <td> element and a text node, make the text
    // node the contents of the <td>, and put the <td> at
    // the end of the table row
    var cell = document.createElement('td')
    var cellText = document.createTextNode(
      names[i].charAt(0).toUpperCase() + names[i].slice(1) + ' ' + insults[i]
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

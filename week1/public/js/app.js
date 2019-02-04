function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
//Create the XHR Object
let xhr = new XMLHttpRequest()
let xhrDogs = new XMLHttpRequest()
//Call the open function, GET-type of request, url, true-asynchronous
xhr.open('GET', 'https://api.whatdoestrumpthink.com/api/v1/quotes', true)
xhrDogs.open('GET', 'https://dog.ceo/api/breeds/image/random/50', true)
//call the onload
xhr.onload = function() {
  //check if the status is 200(means everything is okay)
  if (this.status === 200) {
    //return server response as an object with JSON.parse
    console.log(JSON.parse(this.responseText))
    quotes = JSON.parse(this.responseText)
    document.getElementById('quote').innerHTML =
      '"' +
      quotes.messages.non_personalized[
        getRandomInt(quotes.messages.non_personalized.length)
      ] +
      '"'
  }
}
xhrDogs.onload = function() {
  //check if the status is 200(means everything is okay)
  if (this.status === 200) {
    //return server response as an object with JSON.parse
    console.log(JSON.parse(this.responseText))
    dogImage = JSON.parse(this.responseText)
    document.getElementById('image').src =
      dogImage.message[getRandomInt(dogImage.message.length)]
  }
}

function next() {
  document.getElementById('quote').innerHTML =
    '"' +
    quotes.messages.non_personalized[
      getRandomInt(quotes.messages.non_personalized.length)
    ] +
    '"'
  document.getElementById('image').src =
    dogImage.message[getRandomInt(dogImage.message.length)]
}
//call send
xhr.send()
xhrDogs.send()
//Common Types of HTTP Statuses
// 200: OK
// 404: ERROR
// 403: FORBIDDEN
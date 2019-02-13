function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

//Following is inspired by https://dev.to/bjhaid_93/beginners-guide-to-fetching-data-with-ajax-fetch-api--asyncawait-3m1l
//Create the XHR Object

;(function() {
  const xhr = new XMLHttpRequest()
  const xhrDogs = new XMLHttpRequest()

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
      randNum = getRandomInt(quotes.messages.non_personalized.length)
      document.getElementById('quote').innerHTML = `"${
        quotes.messages.non_personalized[randNum]
      }"`
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
  //call send
  xhr.send()
  xhrDogs.send()
})()

document
  .getElementById('buttonNext')
  .addEventListener('click', function next() {
    randNum = getRandomInt(quotes.messages.non_personalized.length)
    document.getElementById('quote').innerHTML =
      '"' + quotes.messages.non_personalized[randNum] + '"'
    document.getElementById('image').src =
      dogImage.message[getRandomInt(dogImage.message.length)]
  })

document
  .getElementById('speechButton')
  .addEventListener('click', function playSound() {
    responsiveVoice.speak(quotes.messages.non_personalized[randNum])
  })

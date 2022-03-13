console.log('%c HI', 'color: firebrick')
// document.addEventListener("DOMContentLoaded",imageParser)

const dogImageContainer = document.querySelector("#dog-image-container")
const dogUL = document.querySelector("#dog-breeds")

// challenge 1
fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(resp => resp.json())
  .then(handleImageAppending)
  .catch(error => {
    console.log(`Here's the error: ${error}`)
  })

// challenge 2
fetch("https://dog.ceo/api/breeds/list/all")
  .then(resp => resp.json())
  .then(resp => {
    let dogBreedsArr = Object.keys(resp.message)
    dogBreedsArr.forEach(addLI)
  })

// challenge 1 stuff
function handleImageAppending(data) {
  let arrOfDogURLs = data.message
  arrOfDogURLs.forEach(url => {
    dogImageContainer.innerHTML += makeImageTagString(url)
  })}

  function makeImageTagString(url) {
    return `<img src="${url}"/>`
  }

function makeImageTagElement(url) {
  let imageTag = document.createElement("img")
  imageTag.src = url
  return imageTag
}

// challenge 3
dogUL.addEventListener("click", (e) => {
  if (e.target.dataset.info === "breed") {
    e.target.style.color = "blue"
  }
})

// challenge 4
let dogSelect = document.getElementById("breed-dropdown")
dogSelect.addEventListener("change", (e) => {
  fetch("https://dog.ceo/api/breeds/list/all")
  .then(resp => resp.json())
  .then(resp => {
    let dogBreedsArr = Object.keys(resp.message)

    let filteredArr = dogBreedsArr.filter(breed => {
      return breed.startsWith(e.target.value)
    })

    dogUL.innerHTML = ""
    filteredArr.forEach(addLI)
  })
})

function addLI(breed) {
  let dogUL = document.querySelector("#dog-breeds")
  dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
}
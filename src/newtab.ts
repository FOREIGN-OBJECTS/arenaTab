chrome.runtime.sendMessage({ name: "fetchImage" }, (response) => {
  // wait for response
  const { imageURL } = response
  document.getElementById('image1').style.backgroundImage = `url(${imageURL})`

  document.getElementById('image2').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image2').style.backgroundPosition= '25% 75%'

  document.getElementById('image3').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image3').style.backgroundPosition = '75% 25%'
})

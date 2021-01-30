let darkMode: boolean
let currentChannel: string
const defaultChannel = 'https://www.are.na/kalli-retzepi/mais-oui-images'
const fallbackImage = 'https://d2w9rnfcy7mm78.cloudfront.net/1554784/original_0391fc0146953aa05ce6b2a20322a41a.jpg?1515018840?bc=1'

chrome.runtime.sendMessage({ name: "load"}, (response) => {
  darkMode = response.darkMode ? JSON.parse(response.darkMode) : false
  setBg(darkMode)

  currentChannel = response.currentChannel ? response.currentChannel : defaultChannel
  setChannel(currentChannel)
  setWarning('')

  const index = response.index ? JSON.parse(response.index) : 0
  saveToLocalStorage(index.toString(), 'index')
})

chrome.runtime.sendMessage({ name: "fetchImage" }, (response) => {
  // if response is still pending
  if (!response) {
    setImages(fallbackImage)
  }

  // watch for data glitches in the array
  if ( !response || (response.length === 0) || !response.image.large.url) {
    setImages(fallbackImage)
    setWarning('Something went wrong with loading this channel, mind verifying the URL?')
  } else {
    setImages(response.image.large.url)
  }
    setUX()
})

const setImages = (imageURL: string) => {
  if (!document.getElementById('image1') ||
      !document.getElementById('image2') ||
      !document.getElementById('image3')
    ) {
    return null
  }

  document.getElementById('image1').style.backgroundImage = `url(${imageURL})`

  document.getElementById("image2").classList.remove("animation")
  document.getElementById('image2').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image2').style.backgroundPosition= '75% 25%'

  document.getElementById('image3').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image3').style.backgroundPosition = '25% 75%'
}

const setUX = () => {
  if (!document.getElementById('input') || !document.getElementById('toggle')) return null

  document.getElementById('input').addEventListener('change', e => handleChange(e))
  document.getElementById('toggle').addEventListener('click', e => handleToggle(e))
}

const handleChange = (e: Event) => {
  e.preventDefault()
  const input = document.getElementById('input') as HTMLInputElement
  const value = input.value
  saveToLocalStorage(value, 'currentChannel')
  reloadTab()
}

const reloadTab = () => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.reload(tabs[0].id)
  })
}

const saveToLocalStorage = (value: string, id: string) => {
  try {
    const valueStr = JSON.stringify(value)
    localStorage.setItem(id, valueStr)
  }
  catch(e) {
    console.log('failed saving', e)
  }
}

const setBg = (darkMode: boolean) => {
  if (!document.getElementById('arenaTab') || !document.getElementById('settings')) return null

  document.getElementById('arenaTab').style.backgroundColor = darkMode ? '#000' : '#fff'
  document.getElementById('settings').style.filter = !darkMode ? 'invert(0)' : 'invert(1)'
  saveToLocalStorage(darkMode.toString(), 'darkMode')
}

const setChannel = (currentChannel: string) => {
  if (!document.getElementById('currentChannel')) return null

  if (isValidURL(currentChannel)) {
    document.getElementById('currentChannel').setAttribute("href", currentChannel)
    document.getElementById('currentChannel').innerHTML = currentChannel
    saveToLocalStorage(currentChannel, 'currentChannel')
  }
  else {
    setWarning('Please enter a valid URL =)')
  }
}

const setWarning = (message: string) => {
  if (!document.getElementById('warning')) return null

  document.getElementById('warning').style.opacity = "1"
  document.getElementById('warning').innerHTML = message
}

const isValidURL = (urlToCheck: string) => {
  let url
  try {
    url = new URL(urlToCheck);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

const handleToggle = (e: Event) => {
  darkMode = !darkMode
  setBg(darkMode)
}

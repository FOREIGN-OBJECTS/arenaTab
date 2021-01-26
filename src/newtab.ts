let darkMode: boolean
let currentChannel: string
const defaultChannel = 'https://www.are.na/tobias-koch/accidental-renaissance'
const fallbackImage = 'https://d2w9rnfcy7mm78.cloudfront.net/1554784/original_0391fc0146953aa05ce6b2a20322a41a.jpg?1515018840?bc=1'

chrome.runtime.sendMessage({ name: "load"}, (response) => {
  darkMode = response.darkMode ? JSON.parse(response.darkMode) : false
  setBg(darkMode)

  currentChannel = response.currentChannel ? response.currentChannel : defaultChannel
  setChannel(currentChannel)

})

chrome.runtime.sendMessage({ name: "fetchImage" }, (contents) => {
  // process response array
  const randomIndex = contents && contents.length > 0 ? Math.floor(Math.random() * contents.length) : 0

  if (!contents[randomIndex].image.large.url) {
    setWarning('Something went wrong with loading this image, will reload.')
    reloadTab()
  }
  const imageURL = contents && contents.length > 0 ? contents[randomIndex].image.large.url : fallbackImage

  // Images
  document.getElementById('image1').style.backgroundImage = `url(${imageURL})`

  document.getElementById('image2').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image2').style.backgroundPosition= '75% 25%'

  document.getElementById('image3').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image3').style.backgroundPosition = '25% 75%'

  // UX
  document.getElementById('input').addEventListener('change', e => handleChange(e))
  document.getElementById('toggle').addEventListener('click', e => handleToggle(e))

  document.getElementById('currentChannelLabel').addEventListener('click', e=>toggleVisibility(e))
  document.getElementById('inputLabel').addEventListener('click', e=>toggleVisibility(e))

})

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
    console.log('reload')
  })
}

const saveToLocalStorage = (value: string, id: string) => {
  try {
    const valueStr = JSON.stringify(value)
    localStorage.setItem(id, valueStr)
    console.log(`saved ${id}:${value}`)
  }
  catch(e) {
    console.log('failed saving', e)
  }
}

const setBg = (darkMode: boolean) => {
  document.getElementById('arenaTab').style.backgroundColor = darkMode ? '#000' : '#fff'
  document.getElementById('settings').style.filter = !darkMode ? 'invert(0)' : 'invert(1)'
  saveToLocalStorage(darkMode.toString(), 'darkMode')
}

const setChannel = (currentChannel: string) => {
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

const toggleVisibility = (e: Event) => {
  e.preventDefault()
  const element = e.target as HTMLElement
  const id = element.id === 'currentChannelLabel' ? 'currentChannel' : 'input'
  const input = document.getElementById(id) as HTMLElement
  const opacity = input.style.opacity;
  input.style.opacity = opacity === '0' ? '1' : '0';
}

let darkMode = false

chrome.runtime.sendMessage({ name: "fetchImage" }, (contents) => {
  // fallback image
  const fallbackURL = !contents || contents.length === 0 ? 'https://d2w9rnfcy7mm78.cloudfront.net/1554784/original_0391fc0146953aa05ce6b2a20322a41a.jpg?1515018840?bc=1' : ''

  // process response array
  const randomIndex = contents ? Math.floor(Math.random() * contents.length) : 0
  const imageURL = contents && contents.length > 0 ? contents[randomIndex].image.large.url : fallbackURL

  // background
  document.onload = () => setBg(darkMode)

  // Images
  document.getElementById('image1').style.backgroundImage = `url(${imageURL})`

  document.getElementById('image2').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image2').style.backgroundPosition= '75% 25%'

  document.getElementById('image3').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image3').style.backgroundPosition = '25% 75%'

  // UX
  document.getElementById('input').addEventListener('change', e => handleChange(e))
  document.getElementById('toggle').addEventListener('click', e => handleToggle(e))

})

const handleChange = (e: Event) => {
  e.preventDefault()
  const input = document.getElementById('input') as HTMLInputElement
  const value = input.value
  saveToLocalStorage(value, 'input')
}

const saveToLocalStorage = (value: string, id: string) => {
  try {
    const valueStr = JSON.stringify(value)
    localStorage.setItem(id, valueStr)
    console.log('saved', value, 'to localStorage')
  }
  catch(e) {
    console.log('failed saving', e)
  }
}

const setBg = (darkMode: boolean) => {
  document.bgColor = darkMode ? '#000' : '#fff'
  document.getElementById('settings').style.filter = !darkMode ? 'invert(0)' : 'invert(1)'
}

const handleToggle = (e: Event) => {
  darkMode = !darkMode
  saveToLocalStorage(darkMode.toString(), 'darkMode')
  setBg(darkMode)
}

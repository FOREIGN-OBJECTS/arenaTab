let isDark = false

chrome.runtime.sendMessage({ name: "fetchImage" }, (response) => {
  // wait for response from API
  const { imageURL } = response

  document.getElementById('image1').style.backgroundImage = `url(${imageURL})`

  document.getElementById('image2').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image2').style.backgroundPosition= '25% 75%'

  document.getElementById('image3').style.backgroundImage = `url(${imageURL})`
  document.getElementById('image3').style.backgroundPosition = '75% 25%'

  document.getElementById('input').addEventListener('change', e => handleChange(e))
  document.getElementById('toggle').addEventListener('click', e => handleToggle(e))

})

const handleChange = (e: Event) => {
  e.preventDefault()
  const input = document.getElementById('input') as HTMLInputElement
  const value = input.value
  saveToLocalStorage(value)
}

const saveToLocalStorage = (value: string) => {
  try {
    const valueStr = JSON.stringify(value)
    localStorage.setItem('input', valueStr)
    console.log('saved', value, 'to localStorage')
  }
  catch(e) {
    console.log('failed saving', e)
  }
}

const handleToggle = (e: Event) => {
  e.preventDefault()
  isDark = !isDark
  document.bgColor = isDark ? '#000' : '#fff'
  document.getElementById('settings').style.filter = !isDark ? 'invert(0)' : 'invert(1)'
}

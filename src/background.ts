// listen for messages from newtab.ts
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name = "fetchImage") {

    // get channel from localStorage, if it exists
    const channel = getFromLocalStorage()
    // retrieve image from channel using API
    fetchFromAPI(channel).then( (contents) => {
      const imageURL = contents[0].image.large.url
      // send to newtab.ts for display
      console.log(imageURL)
      response({ imageURL })
      return true
      }
    )
  }
})

const fetchFromAPI = async (channel: string) => {
  const arenaURL = `http://api.are.na/v2/channels/${channel}/contents`
  try {
    let response = await fetch(arenaURL)
    let { contents } = await response.json()
    return contents
   } catch (error) {
     console.log(error);
   }
}

const getFromLocalStorage = () => {
  try {
    const value = localStorage.getItem('input')
    console.log('retrieved', value, 'from localStorage')
    return JSON.parse(value)
  } catch(e) {
    console.log('failed getting', e)
  }
}

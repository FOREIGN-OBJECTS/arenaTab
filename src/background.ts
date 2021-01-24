// listen for messages from newtab.ts
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name = "fetchImage") {

    // get channel from localStorage, if it exists
    const channel = getFromLocalStorage()
    // retrieve image from channel using API
    fetchFromAPI(channel)
    // send to newtab.ts for display
    .then(response)
    return true
  }
})

const fetchFromAPI = async (channel: string) => {
  const arenaURL = `http://api.are.na/v2/channels/${channel}/`
  try {
    const lengthResponse = await fetch(arenaURL)
    const { length } = await lengthResponse.json()

    const lastPage = Math.floor(length / 25) // every page has 25 items
    const numOfItems = 2

    const contentResponse  = await fetch(`${arenaURL}/contents?page=${lastPage}&amp;per=${numOfItems}`)
    let { contents } = await contentResponse.json()
    console.log(contents)
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

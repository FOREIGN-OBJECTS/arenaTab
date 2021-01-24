// listen for messages from newtab.ts
chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.name = "fetchImage") {

    // get channel from localStorage, if it exists
    const channel = getFromLocalStorage()
    // retrieve image from channel using API
    const contents = await fetchFromAPI(channel)
    console.log(contents)
    // send to newtab.ts for display
    response({ imageURL: 'https://d2w9rnfcy7mm78.cloudfront.net/3129866/original_deee6347ec61922e66b618f8b8d1c77a.jpg?1543681222?bc=1' })
  }
})

const fetchFromAPI = async (channel: string) => {
  const arenaURL = `http://api.are.na/v2/channels/${channel}/contents`
  try {
    let response = await fetch(arenaURL)
    return await response.json()
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

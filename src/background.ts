const fallbackSlug= 'mais-oui-images'

// listen for messages from newtab.ts
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // handle dark mode
  if (msg.name === "load") {
    const darkMode = getFromLocalStorage('darkMode')
    const currentChannel = getFromLocalStorage('currentChannel')
    response({ darkMode, currentChannel })
  }

  if (msg.name === "fetchImage") {
    // destructure URL
    const currentChannel = getFromLocalStorage('currentChannel')
    let slug
    if (currentChannel) {
      const parts = currentChannel.split('/')
      slug = parts[parts.length - 1]
    }
    else {
      slug = fallbackSlug
    }

    // send back to newtab.ts to display
    fetchFromAPI(slug).then(response)
    // fixes async/await problems since background.ts is by default synchronous
    return true
  }

})

const fetchFromAPI = async (slug: string) => {
  const arenaURL = `http://api.are.na/v2/channels/${slug}/`
  try {
    const lengthResponse = await fetch(arenaURL)
    const { length } = await lengthResponse.json()

    const lastPage = Math.floor(length / 25) // every page has 25 items
    const numOfItems = 25

    const contentResponse  = await fetch(`${arenaURL}/contents?page=${lastPage}&amp;per=${numOfItems}`)
    let { contents } = await contentResponse.json()
    const randomElement = contents[(Math.random() * contents.length) | 0]
    return randomElement

   } catch(error) {
     console.log(error);
   }
}

const getFromLocalStorage = (id: string) => {
  try {
    const value = localStorage.getItem(id)
    return JSON.parse(value)
  } catch(e) {
    console.log('failed getting', e)
  }
}

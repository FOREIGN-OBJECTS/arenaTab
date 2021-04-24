const fallbackSlug= 'mais-oui-images'
const arrayLength = 24
// listen for messages from newtab.ts
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // handle dark mode
  if (msg.name === "load") {
    const darkMode = getFromLocalStorage('darkMode')
    const currentChannel = getFromLocalStorage('currentChannel')
    const index = setIndex()
    response({ darkMode, currentChannel, index })
  }

  if (msg.name === "fetchImage") {
    // destructure URL
    const currentChannel = getFromLocalStorage('currentChannel')
    const index = getFromLocalStorage('index')
    let slug
    if (currentChannel) {
      const parts = currentChannel.split('/')
      slug = parts[parts.length - 1]
    }
    else {
      slug = fallbackSlug
    }

    // send back to newtab.ts to display
    fetchFromAPI(slug, index).then(response)
    // fixes async/await problems since background.ts is by default synchronous
    return true
  }

})

const setIndex = () => {
  let index = getFromLocalStorage('index')
  if (index >= 0 && index <= arrayLength) {
    ++index
  }
  else {
    index = 1
  }
  return index
}

const fetchFromAPI = async (slug: string, index: number) => {
  const arenaURL = `http://api.are.na/v2/channels/${slug}/`
  try {
    const lengthResponse = await fetch(arenaURL)
    const { length } = await lengthResponse.json()

    const lastPage = Math.floor(length / 25) // every page has 25 items
    const numOfItems = 25
    const fetchedPage = lastPage

    const contentResponse = await fetch(`${arenaURL}/contents?page=${fetchedPage}&amp;per=${numOfItems}`)
    let { contents } = await contentResponse.json()
    return contents[index]

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

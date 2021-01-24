// listen for messages from newtab.ts
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name = "fetchImage") {

    const channel = getFromLocalStorage()
    const images = fetchFromAPI(channel)

    // send to newtab.ts
    response({imageURL: images[Math.floor(Math.random() * images.length)]})
  }
})

const fetchFromAPI = (channel: string) => {
  // 📌📌 Fetch images from API using channel name
  const images = [
    'https://d2w9rnfcy7mm78.cloudfront.net/4962157/original_6bd855707f0bb8688e4fc3a860b37f48.jpg?1567691710?bc=0',
    'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiIyNDA3ODU3L29yaWdpbmFsX2RmMGZlMjU5MjdkZjAzY2ZhNjEwOTNhOGZjMWNlMTc0LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTgwMCwiaGVpZ2h0IjoxODAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwicm90YXRlIjpudWxsLCJqcGVnIjp7InF1YWxpdHkiOjkwfX19?bc=1',
    'https://d2w9rnfcy7mm78.cloudfront.net/342607/original_3ce7bdcd6ebd19b3fdc4c12b43d48e15.jpg?1424525958?bc=1',
    'https://d2w9rnfcy7mm78.cloudfront.net/5243770/original_f71abbc0b56932e3d20665c6160ac2ec.jpg?1571066762?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/861349/original_edac24d354650eb7b953577b6cb01f0a.jpg?1485886779?bc=1',
    'https://d2w9rnfcy7mm78.cloudfront.net/3126789/original_b61f215895daa913eeb4d639ad2d832a.jpg?1543608436?bc=1',
    'https://d2w9rnfcy7mm78.cloudfront.net/2854197/original_3cea75f0c4345de87bc8de9e489a9921.gif?1539268537?bc=1',
    'https://d2w9rnfcy7mm78.cloudfront.net/1554784/original_0391fc0146953aa05ce6b2a20322a41a.jpg?1515018840?bc=1',
  ]
  return images
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

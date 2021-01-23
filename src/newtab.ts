chrome.runtime.sendMessage({ name: "fetchImage" }, (response) => {
  // wait for response
  console.log(response)
})

// listen for messages from newtab.ts

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name = "fetchImage") {
    // call API
    // wait for response


    // send to newtab.ts
    response({imageURL: "random"})
  }
})

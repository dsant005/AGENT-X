window.agentxChrome = {
  sendRuntimeMessage: (name, payload) => {
    return new Promise(function (resolve, reject) {
      chrome.runtime.sendMessage({
        name: name,
        payload: payload
      }, (results, err) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
  sendRunTimeMessageWithID: (id, name, payload) => {
    return new Promise(function (resolve, reject) {
      chrome.runtime.sendMessage(id, {
        name: name,
        payload: payload
      }, (results, err) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
  sendActiveTabMessage: (name, payload) => {
    return new Promise(function (resolve, reject) {
      chrome.tabs.query({
          currentWindow: true,
          active: true
        },
        (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            name: name,
            payload: payload
          }, (results, err) => {
            if (err) {
              reject(err);
            }
            resolve(results);
          });
        });
    });
  },
  installHook: (callback) => {
    chrome.runtime.onInstalled.addListener(() => {
      callback();
    });
  }
};

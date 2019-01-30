$(document).ready(() => {
  const START_PAGE_SCRAPE = 'startPageScrape',
    START_SELECTOR_MODE = 'startSelectorMode',
    COMPLETE_PAGE_SCRAPE = 'completePageScrape',
    SELECTOR_MODE_ACTIVE = 'inSelectorMode',
    START_OVERLAY = 'paintOverlay',
    DISABLE_OVERLAY = 'clearOverlay',
    REQUEST_DATA_FOR_PAINT = 'requestDataForPaint',
    OVERLAY = new window.AgentxOverlay();

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let results = {
      name: 'failure',
      payload: {}
    }
    console.log('Reieved signal', request);
    switch (request.name) {
      case START_PAGE_SCRAPE:
        // do scrape
        console.log('Recieved start', sender);
        OVERLAY.clear();
        results = {
          name: COMPLETE_PAGE_SCRAPE,
          payload: window.aist_scrape()
        }
        chrome.runtime.sendMessage(sender.id, results);
        break;
      case START_SELECTOR_MODE:
        console.log('SELECTOR MODE');
        results = {
          name: SELECTOR_MODE_ACTIVE,
          payload: null
        };
        window.agentx_selector(request.payload);
        break;
      case START_OVERLAY:
        console.log('repaint overlay');
        OVERLAY.paint(request.payload.analysis, request.payload.scrape);
        break;
      case DISABLE_OVERLAY:
        console.log('clearing overlay');
        OVERLAY.clear();
        break;
    }
    sendResponse(results);
  });
  scrape = {
    name: COMPLETE_PAGE_SCRAPE,
    payload: window.aist_scrape()
  }
  chrome.runtime.sendMessage({
    name: REQUEST_DATA_FOR_PAINT,
    payload: window.location.href
  }, (results) => {
    if (results) {
      console.log('got the response data', results)
      if (results.payload && results.payload.analysis && scrape) {
        console.log('painting now');
        OVERLAY.paint(results.payload.analysis, scrape.payload);
      }
    }
  });

  console.log('Content loaded.');
})

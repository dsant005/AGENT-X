$(document).ready(() => {
  const CONFIG = window.agentxConfig,
    LOGGER = new window.AgentxLogger('Content'),
    OVERLAY = new window.AgentxOverlay(),
    CHROME = window.agentxChrome;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let results = {
      name: 'failure',
      payload: {}
    }
    try {
      switch (request.name) {
        case CONFIG.START_PAGE_SCRAPE:
          LOGGER.log('Beginning scrape', sender);
          OVERLAY.clear();
          CHROME.sendRunTimeMessageWithID(sender.id, CONFIG.COMPLETE_PAGE_SCRAPE, window.aist_scrape());
          break;
        case CONFIG.START_SELECTOR_MODE:
          LOGGER.log('Selector mode activating');
          results = {
            name: CONFIG.SELECTOR_MODE_ACTIVE,
            payload: null
          };
          window.agentx_selector(request.payload);
          break;
        case CONFIG.START_OVERLAY:
          LOGGER.log('Recieved request to paint overlay', request);
          OVERLAY.paint(request.payload.analysis, request.payload.scrape);
          break;
        case CONFIG.DISABLE_OVERLAY:
          LOGGER.log('Recieved request to clear overlay');
          OVERLAY.clear();
          break;
        case CONFIG.COPY_SCRAPE:
          LOGGER.log('Recieved request to copy scrape to clipboard.', request);
          window.agentx_copy_scrape(request.payload);
          break;
        case CONFIG.ACTIVE_URL:
          LOGGER.log('Recieved request for active URL.');
          results = window.location.href;
          break;
        default:
          LOGGER.log('Recieved unknown event', request, sender);
          break;
      }
    } catch (e) {
      const err = {
        heading: 'Error',
        message: 'An unknown error occured.'
      };
      CHROME.sendRuntimeMessage(CONFIG.ERROR_MESSAGE, err);
    }
    sendResponse(results);
  });

  function init() {
    LOGGER.log('Performing page load scrape');
    scrape = {
      name: CONFIG.COMPLETE_PAGE_SCRAPE,
      payload: window.aist_scrape()
    }
    CHROME.sendRuntimeMessage(CONFIG.REQUEST_DATA_FOR_PAINT, window.location.href)
      .then((results) => {
        if (results) {
          if (results.payload && results.payload.analysis && scrape) {
            LOGGER.log('Performing page load paint');
            OVERLAY.paint(results.payload.analysis, scrape.payload);
          }
        }
      });
  }
  init();

  LOGGER.log('loaded.');
})

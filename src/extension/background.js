(() => {
  const CONFIG = window.agentxConfig,
    STORAGE = new window.AgentxStorage(),
    CHROME = window.agentxChrome,
    LOGGER = new window.AgentxLogger('Background'),
    BACKGROUND_SERVICE = new AgentxBackgroundService(STORAGE, LOGGER);

  // Set default settings on Chrome Extension install.
  CHROME.installHook(() => {
    STORAGE.setBaseUrl(CONFIG.DEFAULT_URL);
    STORAGE.setState(0);
    STORAGE.setOverlayEnabled(1);
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.name) {
      case CONFIG.COMPLETE_PAGE_SCRAPE:
        LOGGER.log('Sending Scrape for Analysis', request);
        BACKGROUND_SERVICE.sendAnalysis(request.payload);
        break;
      case CONFIG.REQUEST_DATA_FOR_PAINT:
        LOGGER.log('Request for last Analysis', request)
        let analysis = BACKGROUND_SERVICE.getLastAnalysis(request.payload);
        sendResponse({ name: CONFIG.LAST_ANALYSIS, payload: {
              analysis: analysis }});
        break;
      case CONFIG.SEND_ELEMENT_FOR_TRAINING:
        LOGGER.log('Sending element for training', request);
        BACKGROUND_SERVICE.sendForTraining(request.payload.id, request.payload.url, request.payload.type);
        break;
      default:
        LOGGER.log('Unknown event', request, sender);
        break;
    }
  });

  LOGGER.log('Background loaded.')
})();

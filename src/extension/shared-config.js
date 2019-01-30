window.agentxConfig = {
  // App Config
  LOG_LEVEL: 2,
  DEFAULT_URL: 'http://localhost:9000',

  // Local Storage Keys
  APP_STATE: 'appState',
  BASE_URL: 'baseUrl',
  OVERLAY_ENABLED: 'overlayEnabled',

  // Event Names
  ANALYSIS_RECIEVED: 'analysisRecieved',
  ANALYSIS_FAILURE: 'analysisFailure',
  START_OVERLAY: 'paintOverlay',
  OVERLAY_DISABLED: 'overlayDisabled',
  COMPLETE_PAGE_SCRAPE: 'completePageScrape',
  REQUEST_DATA_FOR_PAINT: 'requestDataForPaint',
  SEND_ELEMENT_FOR_TRAINING: 'sendElementForTraining',
  LAST_ANALYSIS: 'lastAnalysis',
  START_PAGE_SCRAPE: 'startPageScrape',
  START_SELECTOR_MODE: 'startSelectorMode',
  SELECTOR_MODE_ACTIVE: 'inSelectorMode',
  DISABLE_OVERLAY: 'clearOverlay'
}

console.log('Background loaded.')
const BASE_URL_KEY = 'base_url',
      STATE_KEY = 'app_state',
      DEFAULT_URL = 'http://localhost:9000',
      COMPLETE_PAGE_SCRAPE = 'completePageScrape',
      ANALYSIS_RECIEVED = 'analysisRecieved',
      ANALYSIS_FAILURE = 'analysisFailure',
      SEND_LABEL = 'sendLabel',
      START_OVERLAY = 'paintOverlay',
      REQUEST_DATA_FOR_PAINT = 'requestDataForPaint',
      OVERLAY_ENABLED = 'overlayEnabled';

chrome.runtime.onInstalled.addListener(() => {
    localStorage.setItem(BASE_URL_KEY, DEFAULT_URL);
    localStorage.setItem(STATE_KEY, 0);
    localStorage.setItem(OVERLAY_ENABLED, 1);
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Got background message', request);
    switch (request.name) {
        case COMPLETE_PAGE_SCRAPE:
            console.log('Recieved completed scrape', request);
            localStorage.setItem('a' + request.payload.url, JSON.stringify(request.payload));
            localStorage.setItem(STATE_KEY, 2);
            sendAJAX('/v1/pageAnalysis/state/concrete', request.payload)
                .then(results => {
                    localStorage.setItem(STATE_KEY, 0);
                    results.analysis.timeStamp = Date.now();
                    localStorage.setItem(request.payload.url, JSON.stringify(results.analysis));
                    chrome.runtime.sendMessage({ name: ANALYSIS_RECIEVED, payload: results });
                    console.log('about to send start_overlay')
                    if (localStorage.getItem(OVERLAY_ENABLED) === '1') {
                        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
                            chrome.tabs.sendMessage(tabs[0].id, { name: START_OVERLAY, payload: { analysis: results.analysis, scrape: request.payload}});
                        });
                    }
                }).catch(err => {
                    console.error(err);
                    chrome.runtime.sendMessage({ name: ANALYSIS_FAILURE, payload: null });
                });
            break;
        case SEND_LABEL:
            sendAJAX('/v1/pageAnalysis/state/concrete', request.payload)
                .then(results => {
                    chrome.runtime.sendMessage({ name: ANALYSIS_RECIEVED, payload: results });
                }).catch(err => {
                    console.error(err);
                    chrome.runtime.sendMessage({ name: ANALYSIS_FAILURE, payload: null });
                });
            break;
        case REQUEST_DATA_FOR_PAINT:
            console.log('request for data', request.payload)
            if (localStorage.getItem(OVERLAY_ENABLED)) {
                const analysis = JSON.parse(localStorage.getItem(request.payload)),
                      scrape = JSON.parse(localStorage.getItem('a' + request.payload));
                console.log('sending data')
                sendResponse({ name: 'data', payload: { analysis: analysis, scrape: scrape } });
            }
            break;
    }
});

function sendAJAX(route, payload) {
    return new Promise(function(resolve, reject) {
    $.ajax({
        type: "POST",
        url: localStorage.getItem(BASE_URL_KEY) + route,
        contentType: "application/json; charset=utf-8",
        data: unescape(encodeURIComponent(JSON.stringify(payload)))})
            .then(response => resolve(response))
            .catch(err => reject(err));
    });
}

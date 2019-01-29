console.log('Background loaded.')
const BASE_URL_KEY = 'base_url',
      ANALYZING_STATE_KEY = 'analyzing',
      DEFAULT_URL = 'http://localhost:9000',
      COMPLETE_PAGE_SCRAPE = 'completePageScrape',
      ANALYSIS_RECIEVED = 'analysisRecieved',
      ANALYSIS_FAILURE = 'analysisFailure',
      SEND_LABEL = 'sendLabel';

chrome.runtime.onInstalled.addListener(() => {
    localStorage.setItem(BASE_URL_KEY, DEFAULT_URL);
});
chrome.runtime.onMessage.addListener((request) => {
    switch (request.name) {
        case COMPLETE_PAGE_SCRAPE:
            console.log('Recieved completed scrape', request);
            localStorage.setItem('a' + request.payload.url, JSON.stringify(request.payload));
            localStorage.setItem(ANALYZING_STATE_KEY, 1);
            sendAJAX('/v1/pageAnalysis/state/concrete', request.payload)
                .then(results => {
                    localStorage.setItem(ANALYZING_STATE_KEY, 0);
                    results.analysis.timeStamp = Date.now();
                    localStorage.setItem(request.payload.url, JSON.stringify(results.analysis));
                    chrome.runtime.sendMessage({ name: ANALYSIS_RECIEVED, payload: results });
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
        default:
            console.error('Should not be here!');
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

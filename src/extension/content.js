console.log('Content loaded.')
const START_PAGE_SCRAPE = 'startPageScrape',
      START_SELECTOR_MODE = 'startSelectorMode',
      COMPLETE_PAGE_SCRAPE = 'completePageScrape',
      SELECTOR_MODE_ACTIVE = 'inSelectorMode',
      SCRAPING_STATE_KEY = 'scraping';
      
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let results = { name: 'failure', payload: {} }

    switch (request.name) {
        case START_PAGE_SCRAPE:
            // do scrape
            console.log('Recieved start signal', sender);
            localStorage.setItem(SCRAPING_STATE_KEY, 1);
            results = { name: COMPLETE_PAGE_SCRAPE, payload: window.aist_scrape() }
            localStorage.setItem(SCRAPING_STATE_KEY, 0);
            chrome.runtime.sendMessage(sender.id, results);
            break;
        case START_SELECTOR_MODE:
            console.log('SELECTOR MODE');
            results = { name: SELECTOR_MODE_ACTIVE, payload: null };
            window.agentx_selector(request.payload);
            break;
        default:
            console.error('How did you get here!?');
    }
    sendResponse(results);
});

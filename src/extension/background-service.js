window.AgentxBackgroundService = function(STORAGE, LOGGER) {
  const CONFIG = window.agentxConfig,
    CHROME = window.agentxChrome;

  this.sendAnalysis = (scrape) => {
    STORAGE.setScrape(scrape.url, scrape);
        STORAGE.setState(2);
        sendAJAX('/v1/pageAnalysis/state/concrete', scrape)
          .then(results => {
            LOGGER.log('Analysis Success', results);
            STORAGE.setState(0);
            results.analysis.timeStamp = Date.now();
            STORAGE.setAnalysis(scrape.url, results.analysis)
            CHROME.sendRuntimeMessage(CONFIG.ANALYSIS_RECIEVED, results);
            if (STORAGE.isOverlayEnabled()) {
              CHROME.sendActiveTabMessage(CONFIG.START_OVERLAY, {
                analysis: results.analysis,
                scrape: scrape
              });
            }
          }).catch(err => {
            LOGGER.error(err);
            CHROME.sendRuntimeMessage(CONFIG.ANALYSIS_FAILURE, null);
          });
  }

  this.getLastAnalysis = (url) => {
    if (STORAGE.isOverlayEnabled()) {
        const analysis = STORAGE.getAnalysis(url);
        return analysis;
      } 
      return null;
  }

  this.sendForTraining = (id, url, type) => {
    const lastScrape = STORAGE.getScrape(url);
        if (lastScrape.elements) {
          delete lastScrape.elements;
        }
        sendAJAX('/v1/pageAnalysis/state/add', {
          id: id,
          classes: [type],
          state: lastScrape
        }).then(response => {
          LOGGER.log(response);
        }).catch(err => {
          LOGGER.error(err);
        });
  }

  function sendAJAX(route, payload) {
    return new Promise(function (resolve, reject) {
      $.ajax({
          type: "POST",
          url: STORAGE.getBaseUrl() + route,
          contentType: "application/json; charset=utf-8",
          data: unescape(encodeURIComponent(JSON.stringify(payload)))
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }
  LOGGER.log('Background service loaded.')
};

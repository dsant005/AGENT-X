window.AgentxBackgroundService = function (STORAGE, LOGGER) {
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
      }).catch(e => {
        LOGGER.error(e);
        const err = {
          heading: 'Analysis Failed',
          message: 'Failed to send scrape of DOM to server, please make sure your PageAnalysis service is running and the appropriate host is provided in settings.'
        };
        STORAGE.setError(err);
        CHROME.sendRuntimeMessage(CONFIG.ERROR_MESSAGE, err);
      });
  };

  this.getLastAnalysis = (url) => {
    if (STORAGE.isOverlayEnabled()) {
      const analysis = STORAGE.getAnalysis(url);
      return analysis;
    }
    return null;
  };

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
    }).catch(e => {
      LOGGER.error(e);
      const err = {
        heading: 'Training Failed',
        message: 'Failed to send training to server, please make sure your PageAnalysis service is running and the appropriate host is provided in settings.'
      };
      STORAGE.setError(err);
      CHROME.sendRuntimeMessage(CONFIG.ERROR_MESSAGE, err);
    });
  };

  this.copyScrape = () => {
    CHROME.sendActiveTabMessage(CONFIG.ACTIVE_URL, null).then((url) => {
      const lastScrape = STORAGE.getScrape(url);
      LOGGER.log('Found scrape for copy', lastScrape);
      CHROME.sendActiveTabMessage(CONFIG.COPY_SCRAPE, lastScrape);
    });
  };

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
  LOGGER.log('service loaded.')
};

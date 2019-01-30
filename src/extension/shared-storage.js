window.AgentxStorage = function(store) {
    const storage = store ? store : localStorage;
    const LOGGER = new window.AgentxLogger('Storage');

    const getObject = (key) => {
        return JSON.parse(storage.getItem(key));
    };

    const setObject = (key, value) => {
        storage.setItem(key, JSON.stringify(value));
    };

    this.getScrape = (url) => {
        return getObject('a' + url);
    }

    this.getAnalysis = (url) => {
        return getObject(url);
    }

    this.getBaseUrl = () => {
        return storage.getItem('baseUrl');
    }

    this.isOverlayEnabled = () => {
        return parseInt(storage.getItem('overlayEnabled'), 10) === 1 ? true : false;
    }

    this.setState = (value) => {
        LOGGER.debug('Setting state to value', value);
        storage.setItem('appState', value);
    }

    this.setScrape = (url, value) => {
        LOGGER.debug('Setting Scrape to value', value);
        return setObject('a' + url, value);
    }

    this.setAnalysis = (url, value) => {
        LOGGER.debug('Setting Analysis to value', value);
        return setObject(url, value);
    }

    this.setBaseUrl = (url) => {
        LOGGER.debug('Setting Base URL to value', value);
        return storage.setItem('baseUrl', url);
    }

    this.setOverlayEnabled = (value) => {
        LOGGER.debug('Setting OverlayEnabled to value', value);
        storage.setItem('overlayEnabled', value)
    }
}
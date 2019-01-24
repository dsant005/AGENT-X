import './scrape.js';
chrome.runtime.onMessage.addListener(function (name) {
    switch (name) {
        case 'startPageAnalysis':
            // do scrape{
            chrome.tabs.executeScript(null, { file: 'jquery.js' }, function () {
                console.log(name);
            });
            break;
        default:
            console.error('Should not be here');
    }
});
//# sourceMappingURL=background.js.map
# AGENT-X

AGENT-X is the label helper component for AGENT, once installed in Chrome it allows for the labeling of HTML elements for training.

### Installation

To install AGENT-X follow the steps below:
* Unzip agent-x.zip
* Open Chrome
* Go to Tools -> Extensions
* Flip the Develop toggle
* Click the button 'Load Unpacked Extension'
* Select the folder you unziped earlier.
* The AGENT-X icon should now be present in Chrome, click on it to ensure it installed properly.

## Development

The project is divided into two parts, the PopOver (The small window that appears when most Chrome extension icons I clicked) and the "extension" which handles communication between the PopOver and the web page as well as interactions with the web page. The "extension" is composed of two major compontents, "Background" and "Content". Content communicates with both the PopOver and Background and is the only method for interacting with the page. Background handles background processes like API calls. The PopOver project is an Angular 7 application located under `src/app` while the "extension" is a vanilla JavaScript and located in the `src/extension` folder.

The Chrome Message Passing framework facilitate communication between the components, it is recommended to read [this](https://developer.chrome.com/extensions/messaging) if you are unfamilar with it. JQuery is used to interact with the DOM. Finally, Angular 7 and RXJS Observables are used for the PopOver. All external interacations to the PopOver are wrapped in Observables in services, this allows for a clean sepeartion of concerns and to re-zone the callbacks since the Chrome APIs exit the NgZone. If you are unfamilar with RXJS Observables it is recommended to read [this](https://www.learnrxjs.io/).

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. Since the popover loads each time the Chrome Extension icon is clicked, it is recommended to use `--prod` to mitigate delayed popup responses. This build command will also copy transpile and copy both the PopOver and "extension" dependencies.

Once the application has been built you can re-install it similarly to the Installation steps above:
* Go to Tools -> Extensions
* Click the button 'Load Unpacked Extension'
* Select the dist/agent-x folder

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

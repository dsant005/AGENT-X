window.AgentxOverlay = function () {
  const LOGGER = new window.AgentxLogger('Overlay');

  this.elements = {};

  this.clear = () => {
    if ($('.agentx-overlay').length > 0) {
      $('.agentx-overlay').remove();
      $('.tooltipstered').tooltipster('destroy');
      $('.tooltipstered').removeClass('tooltipstered');
    }
  }

  this.paint = (analysis, scrape) => {
    LOGGER.log('Painting Now.', analysis, scrape);
    const addMarker = (props, id, className, element) => {
      const body = $('body');
      const div = $('<div></div>')
        .addClass('agentx-overlay agentx-marker ' + className + ' ' + id.replace(':', "-"))
        .css({
          top: props.y,
          left: props.x,
          width: props.width,
          height: props.height,
          "pointer-events": "none"
        });
      body.append(div);
      $(element).tooltipster({
        theme: 'tooltipster-borderless',
        content: id
      });
    }

    const addType = (type, keys, scrape) => {
      for (let key in keys) {
        let widget = scrape.widgets[keys[key]];
        if (widget) {
          addMarker(widget.properties, widget.key, type, scrape.elements[keys[key]]);
        }
      }
    };
    $("body").css("position", "relative");
    this.clear();
    this.elements = scrape.elements;

    for (var key in analysis) {
      if (analysis.hasOwnProperty(key)) {
        addType(key, analysis[key], scrape);
      }
    }

  }
  LOGGER.log('Initialized');
};

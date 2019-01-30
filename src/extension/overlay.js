console.log('Overlay loaded');
window.AgentxOverlay = function() {
    this.elements = {};
    this.clear = () => {
        if($('.agentx-overlay').length > 0) {
            $('.agentx-overlay').remove();
            for(let key in this.elements) {
                $(this.elements[key]).tooltipster();
                $(this.elements[key]).tooltipster('destroy');
            }
        }
    }

    this.paint = (analysis, scrape) => {
        console.log('Painting Now.', analysis, scrape);
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
            console.log($(element).length, element);
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
};

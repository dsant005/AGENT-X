window.agentx_selector = (type) => {
    console.log('selector')

    $('body').find(':visible').each(function() {
        $(this).on('mouseover.agentx', function(e) {
            e.stopPropagation();
            let tag = $('<div></div>')
                .append($(this).prop('tagName'))
                .addClass('agentx-tag')
                .addClass('agentx-' + type);;
            $('body').append(tag);
            $(this).addClass('agentx-active');
            $(this).addClass('agentx-' + type);
            console.log('done');
        });
        $(this).on('mouseout.agentx', function() {
            $('.agentx-tag').remove();
            $(this)
                .removeClass('agentx-active')
                .removeClass('agentx-' + type);
        })
        $(this).click(function(e) {
            e.stopPropagation();
            console.log('Clicked', $(this));
            chrome.runtime.sendMessage({ name: 'sendElementForTraining', payload: { id: $(this).data('widgetid'), url: window.location.href, type: type }});
            return false;
        })

        
    });

    function showBanner(text) {
        const banner = $('<div></div>')
            .append(text)
            .addClass('agentx-banner')
            .hide();

        $('body').append(banner);
        banner.fadeIn(250, () => {
            setTimeout(() => {
                banner.fadeOut(250, () => {
                    banner.remove();
                });
            }, 1000);
        });
    }

    showBanner('Label Mode Active: Press the Escape key to exit.');

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.agentx-tag').remove();
            $('body')
                .find(':visible')
                .off('mouseover.agentx');
            $('.agentx-active')
                .removeClass('agentx-active');
            showBanner('Label Mode Off.');
            $(document).off("keydown");
        }
      });
};

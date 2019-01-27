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
        $(this).click(function() {
            $('.agentx-tag').remove();
            $('body')
                .find(':visible')
                .off('mouseover.agentx');
            $(this)
                .removeClass('agentx-active')
                .removeClass('agentx-' + type);
        })
    });
}
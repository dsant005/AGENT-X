window.agentx_selector = () => {
    console.log('selector')
    $('body').find(':visible').each(function() {

        $(this).on('mouseover.agentx', function(e) {
            e.stopPropagation();
            $(this).addClass('agentx-active');
            console.log('done');
        });
        $(this).on('mouseout.agentx', function() {
            $(this).removeClass('agentx-active');
        })
        $(this).click(function() {
            $('body').find(':visible').off('mouseover.agentx');
            $(this).removeClass('agentx-active');
        })
    });
}
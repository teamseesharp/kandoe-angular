$(document).ready(function () {
    //init Tags Input
    setInterval(function animateProgress() {
        document.getElementById('multiSessionSelect')
            .multiselect({
                enableFiltering: true,
                includeSelectAllOption: true,
                // Re-validate the multiselect field when it is changed
                onChange: function (element, checked) {
                    $('#multiSessionSelect').formValidation('revalidateField', 'browsers');

                    adjustByScrollHeight();
                },
                onDropdownShown: function (e) {
                    adjustByScrollHeight();
                },
                onDropdownHidden: function (e) {
                    adjustByHeight();
                }
            })
    }, 500);

    function adjustByHeight() {
        var $body = $('body'),
            $iframe = $body.data('iframe.fv');
        if ($iframe) {
            // Adjust the height of iframe when hiding the picker
            $iframe.height($body.height());
        }
    }

    function adjustByScrollHeight() {
        var $body = $('body'),
            $iframe = $body.data('iframe.fv');
        if ($iframe) {
            // Adjust the height of iframe when showing the picker
            $iframe.height($body.get(0).scrollHeight);
        }
    }
});
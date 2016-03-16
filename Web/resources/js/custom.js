$(document).ready(function () {
    //init Tags Input
    var isChatLoaded = false;
    setInterval(function (){
        $('#users').tagsinput({
            confirmKeys: [32],
            typeahead: {
                local: ['user@mail.be', 'gebruiker@mail.com', 'deelnemer@mail.net', 'nogiets@mail.nl']
            }
        });

        $('#createTags').tagsinput({
            confirmKeys: [32]
        });

        $('[data-toggle="tooltip"]').tooltip();

        if (!isChatLoaded) {
            isChatLoaded = true;
            var toggle = false;
            var user = "jQuery404";
            var searchBoxText = "Typ hier je bericht";
            var fixIntv;
            var Parent = $("#fixed"); // cache parent div
            var Header = $(".fixedHeader"); // cache header div
            var Chatbox = $(".userinput"); // cache header div
            var fixedBoxsize = $('#fixed').outerHeight() + 'px';
            var messageValue = "";
            Parent.css('height', '30px');

            Header.click(function () {
                toggle = (!toggle) ? true : false;
                if (toggle) {
                    Parent.animate({ 'height': fixedBoxsize }, 300);
                }
                else {
                    Parent.animate({ 'height': '30px' }, 300);
                }

            });

            Chatbox.focus(function () {
                $(this).val(($(this).val() == searchBoxText) ? '' : $(this).val());
            }).blur(function () {
                $(this).val(($(this).val() == '') ? searchBoxText : $(this).val());
            }).keyup(function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                messageValue = $(this).val();
                if (code == 13 && messageValue != "") {
                    $('.fixedContent').append("<div class='userwrap'><span class='user'>" + user + "</span><span class='messages'>" + messageValue + "</span></div>");
                    event.preventDefault();

                    $(".fixedContent").scrollTop($(".fixedContent").height());
                    $(this).val('');
                    messageValue = "";
                }

                $("#sendChatMessage").click(function () {
                    if (messageValue != "") {
                        $('.fixedContent').append("<div class='userwrap'><span class='user'>" + user + "</span><span class='messages'>" + messageValue + "</span></div>");
                        event.preventDefault();

                        $(".fixedContent").scrollTop($(".fixedContent").height());
                        Chatbox.val('');
                        messageValue = "";
                    }
                });
            });
        }

    }, 2000);
});
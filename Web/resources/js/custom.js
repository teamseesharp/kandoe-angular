$(document).ready(function () {
    //init Tags Input
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

        var user = document.getElementById('welcomeText').innerText.substring(9);
        var picture = document.getElementById('sidebarprofilepicture').getAttribute('src');

        if (localStorage.getItem('isChatActive') === "false") {
            localStorage.setItem('isChatActive', true);
            $('#autoGetChatMessages').click();

            var toggle = false;
            var currentDate = new Date();
            var time = ((currentDate.getHours() < 10) ? "0" : "") + currentDate.getHours() + ':'
                        + ((currentDate.getMinutes() < 10) ? "0" : "") + currentDate.getMinutes();
            var searchBoxText = "Typ hier je bericht";
            var fixIntv;
            var Parent = $("#fixed");
            var Header = $(".fixedHeader");
            var Chatbox = $(".userinput");
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
                // scroll automatically to bottom
                $(".fixedContent").animate({
                    scrollTop: $(".fixedContent")[0].scrollHeight
                }, -scrollY);
            });

            Chatbox.focus(function () {
                $(this).val(($(this).val() == searchBoxText) ? '' : $(this).val());
            }).blur(function () {
                $(this).val(($(this).val() == '') ? searchBoxText : $(this).val());
            }).keyup(function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                messageValue = $(this).val();
                if (code == 13 && messageValue != "") {
                    $('#autoAddChatMessage').click();
                    $('#autoGetChatMessages').click();
                    setTimeout(function () {
                        $(".fixedContent").animate({
                            scrollTop: $(".fixedContent")[0].scrollHeight
                        }, -scrollY);
                    }, 100)
                   
                    $(this).val('');
                    messageValue = "";
                }

                $("#sendChatMessage").click(function () {
                    if (messageValue != "") {
                        $('#autoAddChatMessage').click();
                        $('#autoGetChatMessages').click();
                        setTimeout(function () {
                            $(".fixedContent").animate({
                                scrollTop: $(".fixedContent")[0].scrollHeight
                            }, -scrollY);
                        }, 100)

                        Chatbox.val('');
                        messageValue = "";
                    }
                });
            });
        }

    }, 500);

    setInterval(function () {
        $('#autoGetChatMessages').click();
    }, 10000);
});
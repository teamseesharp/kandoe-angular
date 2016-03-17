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

        var user = document.getElementById('welcomeText').innerText.substring(9);
        var picture = document.getElementById('sidebarprofilepicture').getAttribute('src');

        if (!isChatLoaded) {
            isChatLoaded = true;
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
                    $('.media-block').append("<li class='mar-btm'><div class='media-right'><img src='"+ picture +"' class='img-circle img-sm' alt='Profiel foto'></div>"
                        + "<div class='media-body pad-hor speech-right'><div class='speech'><a href='#' class='media-heading'>"+ user 
                        + "</a><p style='text-align: left;'>" + messageValue + "</p><p class='speech-time'><span class='glyphicon glyphicon-time' aria-hidden='true'></span> "
                        + time + "</p></div></div></li>");

                    $(".fixedContent").scrollTop($(".fixedContent").height());
                    $(this).val('');
                    messageValue = "";
                }

                $("#sendChatMessage").click(function () {
                    if (messageValue != "") {
                        $('#autoAddChatMessage').click();
                        $('.media-block').append("<li class='mar-btm'><div class='media-right'><img src='" + picture + "' class='img-circle img-sm' alt='Profiel foto'></div>"
                        + "<div class='media-body pad-hor speech-right'><div class='speech'><a href='#' class='media-heading'>" + user
                        + "</a><p style='text-align: left;'>" + messageValue + "</p><p class='speech-time'><span class='glyphicon glyphicon-time' aria-hidden='true'></span> "
                        + time + "</p></div></div></li>");

                        $(".fixedContent").scrollTop($(".fixedContent").height());
                        Chatbox.val('');
                        messageValue = "";
                    }
                });
            });
        }

        //$('#autoGetChatMessages').click();

    }, 1000);
});
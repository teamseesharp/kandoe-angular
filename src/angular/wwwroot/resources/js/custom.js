﻿$(document).ready(function () {
    //init Tags Input
    setTimeout(function(){
        $('#users').tagsinput({
            typeahead: {
                name: 'users',
                local: ['user@mail.be', 'gebruiker@mail.com', 'deelnemer@mail.net', 'nogiets@mail.nl']
            }
        });
    },500);
});
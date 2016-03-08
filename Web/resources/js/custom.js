$(document).ready(function () {
    //init Tags Input
    setInterval(function (){
        $('#users').tagsinput({
            typeahead: {
                name: 'users',
                local: ['user@mail.be', 'gebruiker@mail.com', 'deelnemer@mail.net', 'nogiets@mail.nl']
            }
        });
        $('[data-toggle="tooltip"]').tooltip();
    }, 500);
});
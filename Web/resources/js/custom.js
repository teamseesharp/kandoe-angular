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

    }, 500);
});
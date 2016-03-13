$(document).ready(function () {
    //init Tags Input
    setInterval(function (){
        $('#users').tagsinput({
            confirmKeys: [32],
            typeahead: {
                local: ['user@mail.be', 'gebruiker@mail.com', 'deelnemer@mail.net', 'nogiets@mail.nl']
            }
        });

        $('.tags').tagsinput({
            confirmKeys: [32],
            typeahead: {
                name: 'tags',
                local: ['a', 'b', 'c', 'd']
            }        });
        $('[data-toggle="tooltip"]').tooltip();

    }, 500);
});
$(document).ready(function () {
    var prevImageUrl = "";
    var imageUrl = "";
    //init Tags Input
    setInterval(function (){
        if (document.querySelectorAll('.fileinput-preview img').length > 0) {
            imageUrl = document.querySelectorAll('.fileinput-preview img')[0].src;
            imageUrl = imageUrl.replace("data:image/png;base64,", "");
            if (imageUrl != prevImageUrl) {
                document.getElementById('saveProfileChangesButton').disabled = true;
                document.getElementById('saveProfileChangesButton').innerText = "Even geduld, je profielfoto wordt geladen..";
                prevImageUrl = imageUrl;

                $.ajax({
                    url: 'https://api.imgur.com/3/image',
                    type: 'POST',
                    headers: {
                        // Your application gets an imgurClientId from Imgur
                        Authorization: 'Client-ID ' + '1f6c06a32845590',
                        Accept: 'application/json'
                    },
                    data: {
                        // convert the image data to base64
                        image: imageUrl,
                        type: 'base64'
                    },
                    success: function (result) {
                        var url = 'https://imgur.com/gallery/' + result.data.id;
                        document.getElementById('profilepicture').innerText = result.data.id;
                        document.getElementById('saveProfileChangesButton').disabled = false;
                        document.getElementById('saveProfileChangesButton').innerText = "Wijzigingen opslaan";
                    }
                });
            }
        }
    }, 500);
});
$(document).ready(function () {
    //init Tags Input
    setInterval(function animateProgress() {
        var progress = document.getElementById('progress');

        if (progress != null) {
            $('.inside').animate({
                'width': progress.innerText + '%'
            }, 500);
            
            var currentPlayerId = document.getElementById('currentPlayerId').innerText;
            var currentPlayerIdElement = document.getElementById(currentPlayerId);
            if (currentPlayerIdElement != null) {
                currentPlayerIdElement.style.transform = "scale(1.5)";
                currentPlayerIdElement.style.backgroundColor = "#84c148";
            }
        }
    }, 500);
});
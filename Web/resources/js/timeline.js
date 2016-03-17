$(document).ready(function () {
    //init Tags Input
    setInterval(function animateProgress() {
        var progress = document.getElementById('progress');
        var currentPlayerId = document.getElementById('currentPlayer');
        if (progress != null) {
            $('.inside').animate({
                'width': progress.innerText + '%'
            }, 500);
            
            var currentPlayerIdElement = document.getElementById(currentPlayerId);
            currentPlayerIdElement.style.transform = "scale(1.2)";
        }
    }, 500);
});
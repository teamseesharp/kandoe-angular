$(document).ready(function () {
    //init Tags Input
    setInterval(function animateProgress() {
        var progress = document.getElementById('progress');
        if (progress != null) {
            $('.inside').animate({
                'width': progress.innerText + '%'
            }, 500);
        }
    }, 500);
});
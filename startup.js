// functions to run as the page loaded for quiz App
function startup() {
    document.addEventListener('DOMContentLoaded', function () {
    loadW3HTML()
    getPort()
    trackLocation()
    }, false);
}

// functions to run as the page loaded for question App
function startupquestion() {
    document.addEventListener('DOMContentLoaded', function () {
    loadW3HTML()
    getPort()
    }, false);
}

function loadW3HTML() {
    w3.includeHTML();
}

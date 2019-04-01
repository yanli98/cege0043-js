// functions to run as the page loaded
function startup() {
    document.addEventListener('DOMContentLoaded', function () {
    loadW3HTML()
    getPort()
    trackLocation()
    }, false);
}

function loadW3HTML() {
    w3.includeHTML();
}

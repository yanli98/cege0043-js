// AJAX codes are adpated from Week5 practicals
// Viewing data as GeoJSON codes are adapted from week 6&7 practicals

// define global variables
var xhrQuizPoints; // process AJAX request 
var QuizLayer; // store quiz points

function loadQuizPoints() 
{
	getPort();
	alert("All Quiz Points will be loaded");
	getQuizPoints();
}

// AJAX request to load quiz points
function getQuizPoints(){
	xhrQuizPoints = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/getQuizPoints/" + httpPortNumber;
	xhrQuizPoints.open("GET", url, true);
	xhrQuizPoints.onreadystatechange = processQuizPoints;
	try {
		xhrQuizPoints.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	xhrQuizPoints.send();
}

// AJAX response for loading quiz points
function processQuizPoints(){
	if (xhrQuizPoints.readState < 4){ 
		console.log('Data Loading...'); // while waiting response from server
	}
	else if (xhrQuizPoints.readyState === 4) { // 4 = response from server completely loaded.
		if (xhrQuizPoints.status > 199 && xhrQuizPoints.status < 300) {
			// http status between 200 to 299 are all successful
			var quizPoints = xhrQuizPoints.responseText;
			loadQuizPointsLayer(quizPoints);
		}
	}
}

// Then, convert the received text (quiz points) from the server to JSON and add it to the map
function loadQuizPointsLayer(quizPoints){
	// convert the text received from the server to JSON 
	var quizPointsJSON = JSON.parse(quizPoints);

	// load the geoJSON layer 
	QuizLayer = L.geoJSON(quizPointsJSON,
	{
		// use point to layer to create the points
		pointToLayer: function(feature, latlng){
			// in this case, we build an HTML DIV string
			// using the values in the data
			var htmlString = "<DIV id='popup'" + feature.properties.id + "><h5>" + feature.properties.question_title + "</h5>";
			htmlString = htmlString + "<p>" + feature.properties.question_text + "</p>";
			htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + " 1'/>" + feature.properties.answer_1 + "<br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + " 2'/>" + feature.properties.answer_2 + "<br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + " 3'/>" + feature.properties.answer_3 + "<br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + " 4'/>" + feature.properties.answer_4 + "<br><br />";
			htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + "); return false;'> Submit Answer</button>";
			// now include a hidden element with the answer
			// in this case the answer is alwasy the first choice
			// for the assignment this will use feature.properties.correct_answer	
			htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>";
			htmlString = htmlString + "</div>";
			return L.marker(latlng, {icon: blueMarker}).bindPopup(htmlString);
			}					
	}).addTo(mymap);
	
	// zoom map so that all data are displayed
	mymap.fitBounds(QuizLayer.getBounds());
}

// add a method to process the button click in this pop-up
// use this to submit the answers to the server
function checkAnswer(questionID){
	// get the answer from the hidden div
	// NB - do this BEFORE you close the pop-up as when you close the pop-up the DIV is destroyed
	var answer = document.getElementById("answer"+questionID).innerHTML;
	// now check the question radio buttons
	var correctAnswer = false;
	var answerSelected = 0;
	var postString = "&question_id=" + questionID;
	
	for (var i=1; i<5; i++){
		if (document.getElementById(questionID + " " + i).checked){
			answerSelected = 1;
			postString = postString + "&answer_selected=" + i;
			
		}
	if ((document.getElementById(questionID+ " " + i).checked) && (i == answer)){
			alert("Well done");
			correctAnswer = true;
			postString = postString + "&correct_answer=" + i;
		}
	}
	if (correctAnswer === false){
		postString = postString + "&correct_answer="+answer
		alert("Better luck next time");
	}		
	
	// now close the popup 
	mymap.closePopup();
	// finally upload the answer calling an AJAX routine
	uploadAnswer(postString);
}

// define global variables to process AJAX request 
var xhrQuizAns;
// AJAX request to upload answers
function uploadAnswer(postString){
	xhrQuizAns = new XMLHttpRequest();
	postString = postString + "&port_id=" + httpPortNumber;
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/uploadAnswer";
	xhrQuizAns.open("POST", url, true);
	xhrQuizAns.onreadystatechange = answerUploaded;
	try {
		xhrQuizAns.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	xhrQuizAns.send(postString);
	alert(postString)
}
// AJAX reponse for uploading answers
function answerUploaded(){	
	if (xhrQuizAns.readyState === 4){
		// once the data is ready, process the data
		// show response in DIV to check if answer uploaded
		document.getElementById("dataUploadResult").innerHTML = xhrQuizAns.responseText;
	}
}


// create markers
var redMarker = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'red'// create red marker
});

var blueMarker = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'blue'// create blue marker
});

var greenMarker = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'green'// create green marker
});
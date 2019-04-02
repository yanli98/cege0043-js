// create a custom popup when a point is clicked on the map
var popup = L.popup(); 
// define coordinate variables
var latitude;
var longitude;


// get coordinates automatically when user clicks on a point
function getCoords(e){
	popup.setLatLng(e.latlng);
	var coordStr = e.latlng.toString();
	coordStr = coordStr.substr(7, coordStr.length - 1);
	coordStr = coordStr.split(")")[0];
	
	latitude = coordStr.split(",")[0];
	longitude = coordStr.split(",")[1];
	
	popup.setContent("Coordinates: " + latitude + " , " + longitude);
	popup.openOn(mymap);
	}

// add the event detector to my map
mymap.on('click', getCoords);

// convert form to string
function startQuestionUpload(){
	// get coordinates
	alert("Start upload data");
	var postString = "&latitude=" + latitude + "&longitude=" + longitude;
	
	// get question title
	var question_title = document.getElementById("question_title").value;
	postString = postString + "&question_title=" + question_title;
	
	// get question text
	var question_text = document.getElementById("question_text").value;
	postString = postString + "&question_text=" + question_text;
	
	// get options
	var answer_1 = document.getElementById("answer_1").value;
	postString = postString + "&answer_1=" + answer_1;
	var answer_2 = document.getElementById("answer_2").value;
	postString = postString + "&answer_2=" + answer_2;
	var answer_3 = document.getElementById("answer_3").value;
	postString = postString + "&answer_3=" + answer_3;
	var answer_4 = document.getElementById("answer_4").value;
	postString = postString + "&answer_4=" + answer_4;
	
	// get correct answer
	var correct_answer = document.getElementById("correct_answer").value;
	postString = postString + "&correct_answer=" + correct_answer;	
	
	alert (postString)
	processData(postString);
}

// define global variables to process AJAX request
var client;
// AJAX request to upload data
function processData(postString){
	client = new XMLHttpRequest();
	postString = postString + "&port_id=" + httpPortNumber;
	var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadQuestion";
	client.open('POST',url,true);
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.onreadystatechange = dataUploaded;
	client.send(postString);
}
// AJAX response for uploading data
function dataUploaded(){
	if (client.readyState === 4){
		// once the data is ready, process the data
		// show response in DIV to check if answer uploaded
		document.getElementById("dataUploadResult").innerHTML = client.responseText;
		alert("Tried to insert data");
	}
}
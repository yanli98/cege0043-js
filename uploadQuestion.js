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
	// error message pops up if
	// 1. user doesn't fill requried fields
	// 2. user doesn't type in 1/2/3/4 for the correct answer
	// 3. coordinate missed
	try {
		alert("Start upload data");
		var postString = "&latitude=" + latitude + "&longitude=" + longitude;
		if (latitude == undefined || longitude == undefined) throw "Please select a point on the map first."
	
		// get question title
		var question_title = document.getElementById("question_title").value;
		if (question_title == "") throw "Please enter the question title.";
			postString = postString + "&question_title=" + question_title;
	
		// get question text
		var question_text = document.getElementById("question_text").value;
		if (question_text == "") throw "Please enter the question text.";	
		postString = postString + "&question_text=" + question_text;
	
		// get four options
		var answer_1 = document.getElementById("answer_1").value;
		postString = postString + "&answer_1=" + answer_1;
		var answer_2 = document.getElementById("answer_2").value;
		postString = postString + "&answer_2=" + answer_2;
		var answer_3 = document.getElementById("answer_3").value;
		postString = postString + "&answer_3=" + answer_3;
		var answer_4 = document.getElementById("answer_4").value;
		postString = postString + "&answer_4=" + answer_4;
	
		if (answer_1 == "" || answer_2 == "" || answer_3 == "" || answer_4 == "") throw "Please enter four answer options."

		// get the correct answer
		var correct_answer = document.getElementById("correct_answer").value;
		postString = postString + "&correct_answer=" + correct_answer;
		
		if (correct_answer != "1" && correct_answer != "2" && correct_answer != "3" && correct_answer != "4") throw "Please enter the correct option (1, 2, 3, or 4)."
		
		alert (postString)
		processData(postString);
	}
	catch(err){
		alert(err);
	}	
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
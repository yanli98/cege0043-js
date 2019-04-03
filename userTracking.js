// Adapted from practical 2
var userMarker;
var userlat;
var userlng;

// Function to show location
function trackLocation() {
	if(navigator.geolocation){
		navigator.geolocation.watchPosition(showPosition);
		alert("Closest quiz pop-up updates very frequently. Please choose an answer and submit it before update.");
	}
	else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";}
}

function showPosition(position){
	if (userMarker){
		mymap.removeLayer(userMarker);
	}
	userlat = position.coords.latitude
	userlng = position.coords.longitude
    userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("You are here!").openPopup();
	alertQuizPoint(position);// pop up quiz point that is closest to the user within the proximity distance.
}

// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit){
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; // degrees - radians
	dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
	// radius of the earth - 3956 miles
	if (unit=="K") { dist = dist * 1.609344 ;} // miles to km
	if (unit=="N") { dist = dist * 0.8684 ;} // miles to nautical miles
	return dist;
}
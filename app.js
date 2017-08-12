function success (pos) { // success callback
	const crd = pos.coords;
	const coords = [crd.latitude, crd.longitude];
	getWeather(coords);
	getCity(coords);
}

function error (err) { // error callback
	console.warn('ERROR(' + err.code + '): ' + err.message);
}

async function getWeather (coords) {
	try {
		const lat = coords[0];
		const lng = coords[1];
		const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/7b3484d50813752e1e2a05f91d621560/${lat},${lng}`;
		let data = await fetch(url);
		data = await data.json();
		document.getElementById('temp').innerHTML = `${Math.round(data.currently.temperature)}`;
		document.getElementById('units').innerHTML = '° F';
		document.getElementById('summary').innerHTML = data.currently.summary;
		addSkycon(data.currently.icon);
	} catch (e) {
		console.log('Unable to fetch weather.');
	}
}

async function getCity (coords) {
	try {
		const lat = coords[0];
		const lng = coords[1];
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}`;
		let data = await fetch(url);
		data = await data.json();
		document.getElementById('city').innerHTML = `${data.results[0].address_components[2].long_name},`;
		document.getElementById('state').innerHTML = data.results[0].address_components[4].short_name;
	} catch (e) {
		console.log('Unable to fetch city and state names.');
	}
}

function addSkycon (condition) {
	const skycons = new Skycons({"color": "black"});
	skycons.add("icon1", condition);
	skycons.play();
}

const temp = document.getElementById('temp');
const units = document.getElementById('units');
const weather = document.getElementById('weather');
weather.addEventListener('click', function () {
	const originalTemp = parseInt(temp.innerHTML);
	const tempC = Math.round((originalTemp - 32) / (9/5));
	const tempF = Math.round((originalTemp * (9/5)) + 32);
	if (units.innerHTML === '° F') {
		units.innerHTML = '° C';
		temp.innerHTML = tempC;
	} else {
		units.innerHTML = '° F';
		temp.innerHTML = tempF;
	}
});

navigator.geolocation.getCurrentPosition(success, error);

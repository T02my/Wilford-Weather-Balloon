/* === VARIABLES === */

/* == HTML elements == */
let temperatureJS = document.querySelector('.temperature-js');
let altitudeJS = document.querySelector('.altitude-js');
let humidityJS = document.querySelector('.humidity-js');
let windspeedJS = document.querySelector('.windspeed-js');
let signalAjs =	document.querySelector('.signalA-js');
let signalBjs =	document.querySelector('.signalB-js');
let atmpressureJS = document.querySelector('.atmpressure-js');

/* == Other variables == */
let currentBalloon = 2; // current active Balloon by default;
let currentBalloonValues = [];


/* === FUNCTIONS === */


const randomNumber = (elementInt, valueInterval) => {
	let min = elementInt - valueInterval;
	let max = elementInt + valueInterval;
	let randomInt = Math.floor(Math.random() * (max - min)) + min;
	return elementInt - randomInt;
}


const screenRandomness = (element, valueInterval) => {
	elementInt = parseInt(removeAllComma(element.innerHTML));
	let value = elementInt - randomNumber(elementInt, valueInterval);
	element.innerHTML = parseInt(value);
}

const randomizeAllValues = () => {
	screenRandomness(temperatureJS, 5);
	screenRandomness(altitudeJS, 50);
	screenRandomness(humidityJS, 2);
	screenRandomness(windspeedJS, 1);
	atmpressureJS.innerHTML = addComma(calcAtmPressure(parseInt(altitudeJS.innerHTML), parseInt(temperatureJS.innerHTML)));
}

const addComma = (input) => {
	let alt = input + ''; // get integer into string
	let arr = alt.split(''); // get string into array...
	if (arr.length >= 4) { // check if its >999 then we can add "," to split up the number for better visual,it should not be above 999999, so here's no checking about that
		arr.splice(-3,0,',');
	}
	return ('splice', arr.join('')); // remove all ','
}

const removeAllComma = (input) => {
	return input.replace(/,/, '');
}


const closeWindow = document.querySelector('.window__close');
closeWindow.addEventListener("click", () => document.querySelector('.welcome__window').style.visibility = "hidden");


const pickBalloon = () => {
    for (let i = 0; i < balloons.length; i++) {
        document.querySelectorAll('.balloon-device')[i].onclick = function () {
        	saveBalloonValues(currentBalloon);
            balloons[i].insertValues();
            currentBalloon = i;
            //document.querySelectorAll('.balloon-device__text')[i].classList.toggle("active"); // fix this
        }
    }  
}


const saveBalloonValues = (currentBalloon) => {
	let int = currentBalloon;
	balloons[int].temperature = temperatureJS.innerHTML;
	balloons[int].altitude = removeAllComma(altitudeJS.innerHTML);
	balloons[int].humidity = humidityJS.innerHTML;
	balloons[int].windspeed = windspeedJS.innerHTML; 
	balloons[int].signalA = signalAjs.innerHTML;
	balloons[int].signalB = signalBjs.innerHTML;
}

const calcAtmPressure = (altitude, temperature) => {
	let h = altitude;
	let p0 = 101325;
	let g = 9.80665;
	let m = 0.0289644;
	let r = 8.31432;
	let t = temperature + 273.15;
	let e = -0.0065;
	let i = 0;
	let formula = p0 * Math.pow(t / (t + (e * (h - i))), (g * m) / (r * e));
	if (formula > 1) {
		return Math.round(formula);
	} else {
		formula = p0 * Math.pow(2.7182, (-0.0342 * h/t));
		return Math.round(formula);
	}
}


/* === Declare class === */

class balloon {
	constructor(name, temperature, altitude, humidity, windspeed, signalA, signalB) {
		this.name = name;
		this.temperature = temperature;
		this.altitude = altitude;
		this.humidity = humidity;
		this.windspeed = windspeed;
		this.signalA = signalA;
		this.signalB = signalB;
		this.atmosphericPressure = calcAtmPressure(this.altitude, this.temperature);
	}

	insertValues() {
		temperatureJS.innerHTML = this.temperature;
		altitudeJS.innerHTML = addComma(this.altitude);
		humidityJS.innerHTML = this.humidity;
		windspeedJS.innerHTML = this.windspeed;
		signalAjs.innerHTML = this.signalA;
		signalBjs.innerHTML = this.signalB;
		atmpressureJS.innerHTML = addComma(this.atmosphericPressure);
	}
}

/* == Balloons params */
let balloons = [
	new balloon('Balloon 1', -110, 29000, 11, 15, 399, 1670),
	new balloon('Balloon 2', -115, 4000, 8, 27, 405, 2000),
	new balloon('Balloon 3', -120, 35000, 9, 72, 403, 1680),
	new balloon('Balloon 4', -100, 14000, 6, 10, 150, 1690),
	new balloon('Balloon 5', -90, 5500, 7, 14, 600, 1700),
	new balloon('Balloon 6', -70, 40000, 10, 16, 900, 1650)
];


/* === Start the f up all the stuff === */

pickBalloon();
setInterval(randomizeAllValues, 2000);


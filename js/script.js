/* === FUNCTIONS === */

const randomNumber = (elementInt, valueInterval) => {
	let min = elementInt - valueInterval;
	let max = elementInt + valueInterval;
	let randomInt = Math.floor(Math.random() * (max - min)) + min;
	return elementInt - randomInt;
}

const screenRandomness = (element, valueInterval) => {
	elementInt = parseInt(document.getElementsByClassName(element)[0].innerHTML);
	let value = elementInt - randomNumber(elementInt, valueInterval);
	document.getElementsByClassName(element)[0].innerHTML = parseInt(value);
}

let test = document.getElementsByClassName('window__close')[0];
test.addEventListener("click", () => document.getElementsByClassName('welcome__window')[0].style.opacity = "0");


/* === Declare objects === */

class balloon {
	constructor(name, temperature, altitude, humidity, windspeed, signalA, signalB, atmosphericPressure) {
		this.name = name;
		this.temperature = temperature;
		this.altitude = altitude;
		this.humidity = humidity;
		this.windspeed = windspeed;
		this.signalA = signalA;
		this.signalB = signalB;
		this.atmosphericPressure = atmosphericPressure;
	}
	sayHi() {
		alert(this.name);
	}
}

let kokot = new balloon('kokot');
kokot.sayHi();

/* === Start the f up all the stuff === */


/*
setInterval(screenRandomness, 2000, 'temperature-js', 10);
*/
function Device(power = 0, isTurnedOn = false) {
	this.power = power;
	this.isTurnedOn = isTurnedOn;
}

Device.prototype.turnOnOff = function () {
	this.isTurnedOn = !this.isTurnedOn;

	if (this.isTurnedOn) {
		console.log("Turning on");
		return;
	}

	console.log("Turning off");
};

Device.prototype.getInfo = function () {
	console.log(`Power: ${this.power}, isTurnedOn: ${this.isTurnedOn}`);
};

function VacuumCleaner(power = 0, isTurnedOn = false, cleaningMode = "dry") {
	Device.apply(this, arguments);
	this.cleaningMode = cleaningMode;
}

VacuumCleaner.prototype = Object.create(Device.prototype);
VacuumCleaner.prototype.constructor = VacuumCleaner;

VacuumCleaner.prototype.getInfo = function () {
	Device.prototype.getInfo.apply(this);
	console.log(`cleaningMode: ${this.cleaningMode}`);
};

VacuumCleaner.prototype.changeMode = function (mode) {
	if (this.isTurnedOn) {
		this.cleaningMode = mode;
		console.log(`The cleaning mode switched to ${this.cleaningMode}`);

		return;
	}

	console.log(`The device is switched off. Can't change cleaning mode`);
};

function RobotCleaner(
	power = 0,
	isTurnedOn = false,
	cleaningMode = "dry",
	hasAreaMap = false
) {
	VacuumCleaner.apply(this, arguments);
	this.hasAreaMap = hasAreaMap;
}

RobotCleaner.prototype = Object.create(VacuumCleaner.prototype);
RobotCleaner.prototype.constructor = RobotCleaner;

RobotCleaner.prototype.setMap = function () {
	if (this.isTurnedOn) {
		this.hasAreaMap = true;
		console.log(`Setting up area map`);

		return;
	}

	console.log(`The device is switched off. Can't set the area map`);
};

RobotCleaner.prototype.getInfo = function () {
	VacuumCleaner.prototype.getInfo.apply(this);
	console.log(`hasAreaMap: ${this.hasAreaMap}`);
};

function RobotSoldier(
	power = 0,
	isTurnedOn = false,
	hasAreaMap = false,
	isShooting = false
) {
	Device.apply(this, arguments);
	this.hasAreaMap = hasAreaMap;
	this.isShooting = isShooting;
}

RobotSoldier.prototype = Object.create(Device.prototype);
RobotSoldier.prototype.constructor = RobotSoldier;

RobotSoldier.prototype.setMap = function () {
	RobotCleaner.prototype.setMap.apply(this);
};

RobotSoldier.prototype.turnOnOff = function () {
	Device.prototype.turnOnOff.apply(this);

	if (!this.isTurnedOn) this.isShooting = false;
};

RobotSoldier.prototype.startShooting = function () {
	if (this.isTurnedOn) {
		this.isShooting = true;
		console.log(`Starting shooting`);
		return;
	}

	console.log(`The device is switched off. Can't start shooting`);
};

RobotSoldier.prototype.stopShooting = function () {
	if (this.isTurnedOn) {
		this.isShooting = false;
		console.log(`Stopping shooting`);
		return;
	}

	console.log(`The device is switched off. The Robot is not shooting`);
};

RobotSoldier.prototype.getShootingStatus = function () {
	if (this.isTurnedOn) {
		this.isShooting
			? console.log(`The Robot is shooting`)
			: console.log(`The Robot is not shooting`);

		return;
	}

	console.log(`The device is switched off. The Robot is not shooting`);
};

RobotSoldier.prototype.getInfo = function () {
	Device.prototype.getInfo.apply(this);
	console.log(`hasAreaMap: ${this.hasAreaMap}, isShooting: ${this.isShooting}`);
};

const vacuumCleaner = new VacuumCleaner(1000);
const robotCleaner = new RobotCleaner(1500, false, "wet", true);
const robotSoldier = new RobotSoldier(3000);

vacuumCleaner.getInfo();
vacuumCleaner.changeMode("dry");
vacuumCleaner.turnOnOff();
vacuumCleaner.changeMode("dry");
vacuumCleaner.getInfo();

robotCleaner.getInfo();
robotCleaner.setMap();
robotCleaner.changeMode("dry");
robotCleaner.turnOnOff();
robotCleaner.changeMode("dry");
robotCleaner.setMap();
robotCleaner.getInfo();

robotSoldier.setMap();
robotSoldier.getInfo();
robotSoldier.turnOnOff();
robotSoldier.startShooting();
robotSoldier.getShootingStatus();
robotSoldier.turnOnOff();
robotSoldier.getShootingStatus();

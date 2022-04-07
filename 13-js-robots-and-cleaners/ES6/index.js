class Device {
	constructor(power = 0, isTurnedOn = false) {
		this.power = power;
		this.isTurnedOn = isTurnedOn;
	}

	turnOnOff() {
		this.isTurnedOn = !this.isTurnedOn;

		if (this.isTurnedOn) {
			console.log("Turning on");
			return;
		}

		console.log("Turning off");
	}

	getInfo() {
		console.log(`Power: ${this.power}, isTurnedOn: ${this.isTurnedOn}`);
	}
}

class VacuumCleaner extends Device {
	constructor(power = 0, isTurnedOn = false, cleaningMode = "dry") {
		super(power, isTurnedOn);
		this.cleaningMode = cleaningMode;
	}

	getInfo() {
		super.getInfo();
		console.log(`cleaningMode: ${this.cleaningMode}`);
	}

	changeMode(mode) {
		if (this.isTurnedOn) {
			this.cleaningMode = mode;
			console.log(`The cleaning mode switched to ${this.cleaningMode}`);

			return;
		}

		console.log(`The device is switched off. Can't change cleaning mode`);
	}
}

class RobotCleaner extends VacuumCleaner {
	constructor(
		power = 0,
		isTurnedOn = false,
		cleaningMode = "dry",
		hasAreaMap = false
	) {
		super(power, isTurnedOn, cleaningMode);
		this.hasAreaMap = hasAreaMap;
	}

	setMap() {
		if (this.isTurnedOn) {
			this.hasAreaMap = true;
			console.log(`Setting up area map`);

			return;
		}

		console.log(`The device is switched off. Can't set the area map`);
	}

	getInfo() {
		super.getInfo();
		console.log(`hasAreaMap: ${this.hasAreaMap}`);
	}
}

class RobotSoldier extends Device {
	constructor(
		power = 0,
		isTurnedOn = false,
		hasAreaMap = false,
		isShooting = false
	) {
		super(power, isTurnedOn);
		this.hasAreaMap = hasAreaMap;
		this.isShooting = isShooting;
		this.cleaner = new RobotCleaner();
	}

	getInfo() {
		super.getInfo();
		console.log(
			`hasAreaMap: ${this.hasAreaMap}, isShooting: ${this.isShooting}`
		);
	}

	turnOnOff() {
		super.turnOnOff();

		if (!this.isTurnedOn) this.isShooting = false;
	}

	setMap() {
		this.cleaner.setMap.apply(this);
	}

	startShooting() {
		if (this.isTurnedOn) {
			this.isShooting = true;

			console.log(`Starting shooting`);

			return;
		}

		console.log(`The device is switched off. Can't start shooting`);
	}

	stopShooting() {
		if (this.isTurnedOn) {
			this.isShooting = false;

			console.log(`Stopping shooting`);

			return;
		}

		console.log(`The device is switched off. The Robot is not shooting`);
	}

	getShootingStatus() {
		if (this.isTurnedOn) {
			return this.isShooting
				? console.log(`The Robot is shooting`)
				: console.log(`The Robot is not shooting`);
		}

		console.log(`The device is switched off. The Robot is not shooting`);
	}
}

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

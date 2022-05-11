const piu = (freq = 500, vol = 0.1) => {
	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	const oscillator = audioCtx.createOscillator();
	const gainNode = audioCtx.createGain();
	oscillator.type = 'square';
	oscillator.frequency.value = freq;
	oscillator.connect(gainNode);
	gainNode.gain.value = vol;
	gainNode.connect(audioCtx.destination);
	let i = 0;
	const freqChanger = (Hz) => {
		if (i < 50) {
			i++;
			oscillator.frequency.value = Hz;
			setTimeout(() => {
				freqChanger(Hz + 50);
				return;
			});
			return;
		}
		oscillator.stop();
	};
	oscillator.start();
	freqChanger(freq + 20);
};

export default piu;

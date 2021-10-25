const judgement = {
	MAX: {
		hitValue: 320,
		hitBonusValue: 32,
		hitBonus: 2,
		hitPunishment: 0,
	},
	300: {
		hitValue: 300,
		hitBonusValue: 32,
		hitBonus: 1,
		hitPunishment: 0,
	},
	200: {
		hitValue: 200,
		hitBonusValue: 16,
		hitBonus: 0,
		hitPunishment: 8,
	},
	100: {
		hitValue: 100,
		hitBonusValue: 8,
		hitBonus: 0,
		hitPunishment: 24,
	},
	50: {
		hitValue: 50,
		hitBonusValue: 4,
		hitBonus: 0,
		hitPunishment: 44,
	},
	MISS: {
		hitValue: 0,
		hitBonusValue: 0,
		hitBonus: 0,
		hitPunishment: 9999999999,
	},
};

const mods = {
	Easy: {
		ModMultiplier: 0.5,
		ModDivider: 1,
	},
	NoFail: {
		ModMultiplier: 0.5,
		ModDivider: 1,
	},
	HalfTime: {
		ModMultiplier: 0.5,
		ModDivider: 1,
	},
	HardRock: {
		ModMultiplier: 1,
		ModDivider: 1.08,
	},
	DoubleTime: {
		ModMultiplier: 1,
		ModDivider: 1.1,
	},
	NightCore: {
		ModMultiplier: 1,
		ModDivider: 1.1,
	},
	FadeIn: {
		ModMultiplier: 1,
		ModDivider: 1.06,
	},
	Hidden: {
		ModMultiplier: 1,
		ModDivider: 1.06,
	},
	FlashLight: {
		ModMultiplier: 1,
		ModDivider: 1.06,
	},
}

const maxScore = 1000000;

function ready(fn) {
	if (document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(function () {
	document.querySelectorAll("input").forEach((input) => {
		input.addEventListener("change", prepCalc);
	});
});

let _bonus = 100;
let _score = 0;
let _bonusScore = 0;

let _miss = 0;
let _50 = 0;
let _100 = 0;
let _200 = 0;
let _300 = 0;
let _320 = 0;
let _total = 0;

function prepCalc() {

	const _miss = parseInt(document.getElementById("txtMiss").value);
	const _50 = parseInt(document.getElementById("txt50").value);
	const _100 = parseInt(document.getElementById("txt100").value);
	const _200 = parseInt(document.getElementById("txt200").value);
	const _300 = parseInt(document.getElementById("txt300").value);
	const _320 = parseInt(document.getElementById("txt320").value);

	let hArray = [
		["MAX", _320],
		["300", _300],
		["200", _200],
		["100", _100],
		["50", _50],
		["MISS", _miss],
	];
	_total = _miss + _50 + _100 + _200 + _300 + _320;

	calc(hArray);
	accCalc();
}

function calc(hArray) {
	//reset
	_score = 0;
	_bonus = 100;

	hArray.forEach((data, index) => {
		let hit = data[0];
		let count = data[1];

		for (let _i = 0; _i < count; _i++) {
			let __in = (maxScore * 1 * 0.5 / _total)

			let __bs = __in
				* (judgement[hit].hitValue / 320);

			_bonus = Math.max(
				0,
				Math.min(
					100,
					_bonus
					+ judgement[hit].hitBonus
					- judgement[hit].hitPunishment
				)
			);

			let __bns = __in
				* (judgement[hit].hitBonusValue * Math.sqrt(_bonus) / 320);

			_score += __bs + __bns;
		}


	});
	document.getElementById("txtScore").value = _score.toFixed(0);
}

function accCalc() {
	// TODO: fix this lol

	let hits = _total;
	let points = (50 * _50)
		+ (100 * _100)
		+ (200 * _200)
		+ (300 * _300)
		+ (300 * _320);

	let acc = (points / (hits * 300)) * 100;


	// TODO: why this thing brokie?
	document.getElementById("txtAcc").value = acc.toFixed(2);
}
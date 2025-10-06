import { describe, it, expect } from 'vitest';
import pretvoriBrojUTekst from './index';

describe('pretvoriBrojUTekst', () => {
	// Test case for zero, null, and undefined
	it('should handle zero and falsy inputs correctly', () => {
		expect(pretvoriBrojUTekst(0)).toBe('nula');
		// @ts-expect-error Testing invalid input
		expect(pretvoriBrojUTekst(null)).toBe('nula');
		// @ts-expect-error Testing invalid input
		expect(pretvoriBrojUTekst(undefined)).toBe('nula');
	});

	// --- BASIC NUMBERS (1-99) ---
	describe('Basic Numbers (1-99)', () => {
		it('should convert single-digit numbers', () => {
			expect(pretvoriBrojUTekst(1)).toBe('jedan');
			expect(pretvoriBrojUTekst(2)).toBe('dva');
			expect(pretvoriBrojUTekst(3)).toBe('tri');
			expect(pretvoriBrojUTekst(4)).toBe('četiri');
			expect(pretvoriBrojUTekst(5)).toBe('pet');
			expect(pretvoriBrojUTekst(6)).toBe('šest');
			expect(pretvoriBrojUTekst(7)).toBe('sedam');
			expect(pretvoriBrojUTekst(8)).toBe('osam');
			expect(pretvoriBrojUTekst(9)).toBe('devet');
		});

		it('should convert teen numbers (10-19)', () => {
			expect(pretvoriBrojUTekst(10)).toBe('deset');
			expect(pretvoriBrojUTekst(11)).toBe('jedanaest');
			expect(pretvoriBrojUTekst(12)).toBe('dvanaest');
			expect(pretvoriBrojUTekst(13)).toBe('trinaest');
			expect(pretvoriBrojUTekst(14)).toBe('četrnaest');
			expect(pretvoriBrojUTekst(15)).toBe('petnaest');
			expect(pretvoriBrojUTekst(16)).toBe('šesnaest');
			expect(pretvoriBrojUTekst(17)).toBe('sedamnaest');
			expect(pretvoriBrojUTekst(18)).toBe('osamnaest');
			expect(pretvoriBrojUTekst(19)).toBe('devetnaest');
		});

		it('should convert double-digit numbers', () => {
			expect(pretvoriBrojUTekst(20)).toBe('dvadeset');
			expect(pretvoriBrojUTekst(21)).toBe('dvadeset jedan');
			expect(pretvoriBrojUTekst(30)).toBe('trideset');
			expect(pretvoriBrojUTekst(40)).toBe('četrdeset');
			expect(pretvoriBrojUTekst(50)).toBe('pedeset');
			expect(pretvoriBrojUTekst(55)).toBe('pedeset pet');
			expect(pretvoriBrojUTekst(60)).toBe('šezdeset');
			expect(pretvoriBrojUTekst(70)).toBe('sedamdeset');
			expect(pretvoriBrojUTekst(80)).toBe('osamdeset');
			expect(pretvoriBrojUTekst(90)).toBe('devedeset');
			expect(pretvoriBrojUTekst(99)).toBe('devedeset devet');
		});
	});

	// --- HUNDREDS (100-999) ---
	describe('Hundreds (100-999)', () => {
		it('should convert round hundreds and handle special cases', () => {
			expect(pretvoriBrojUTekst(100)).toBe('sto');
			expect(pretvoriBrojUTekst(200)).toBe('dvesta');
			expect(pretvoriBrojUTekst(300)).toBe('trista');
			expect(pretvoriBrojUTekst(400)).toBe('četiristo');
			expect(pretvoriBrojUTekst(500)).toBe('petsto');
			expect(pretvoriBrojUTekst(600)).toBe('šeststo');
			expect(pretvoriBrojUTekst(700)).toBe('sedamsto');
			expect(pretvoriBrojUTekst(800)).toBe('osamsto');
			expect(pretvoriBrojUTekst(900)).toBe('devetsto');
		});

		it('should convert complex hundreds', () => {
			expect(pretvoriBrojUTekst(101)).toBe('sto jedan');
			expect(pretvoriBrojUTekst(125)).toBe('sto dvadeset pet');
			expect(pretvoriBrojUTekst(350)).toBe('trista pedeset');
			expect(pretvoriBrojUTekst(999)).toBe('devetsto devedeset devet');
		});

		it('should handle teens in hundreds place', () => {
			expect(pretvoriBrojUTekst(111)).toBe('sto jedanaest');
			expect(pretvoriBrojUTekst(112)).toBe('sto dvanaest');
			expect(pretvoriBrojUTekst(115)).toBe('sto petnaest');
			expect(pretvoriBrojUTekst(119)).toBe('sto devetnaest');
			expect(pretvoriBrojUTekst(211)).toBe('dvesta jedanaest');
			expect(pretvoriBrojUTekst(314)).toBe('trista četrnaest');
		});
	});

	// --- THOUSANDS (1000-999,999) ---
	describe('Thousands (1,000 - 999,999)', () => {
		it('should handle "hiljadu" for 1000', () => {
			expect(pretvoriBrojUTekst(1000)).toBe('hiljadu');
			expect(pretvoriBrojUTekst(1001)).toBe('hiljadu jedan');
		});

		it('should handle suffixes for 2, 3, and 4 thousand ("dve/tri/četiri hiljade")', () => {
			expect(pretvoriBrojUTekst(2000)).toBe('dve hiljade');
			expect(pretvoriBrojUTekst(3000)).toBe('tri hiljade');
			expect(pretvoriBrojUTekst(4000)).toBe('četiri hiljade');
			expect(pretvoriBrojUTekst(4321)).toBe(
				'četiri hiljade trista dvadeset jedan'
			);
		});

		it('should handle suffix "hiljada" for numbers 5 and greater', () => {
			expect(pretvoriBrojUTekst(5000)).toBe('pet hiljada');
			expect(pretvoriBrojUTekst(11000)).toBe('jedanaest hiljada');
			expect(pretvoriBrojUTekst(20000)).toBe('dvadeset hiljada');
		});

		it('should handle grammatical gender changes for 1 and 2 in thousands place', () => {
			expect(pretvoriBrojUTekst(21000)).toBe('dvadeset jedna hiljada');
			expect(pretvoriBrojUTekst(22000)).toBe('dvadeset dve hiljade');
			expect(pretvoriBrojUTekst(31000)).toBe('trideset jedna hiljada');
			expect(pretvoriBrojUTekst(32000)).toBe('trideset dve hiljade');
			expect(pretvoriBrojUTekst(33000)).toBe('trideset tri hiljade');
			expect(pretvoriBrojUTekst(34000)).toBe('trideset četiri hiljade');
			expect(pretvoriBrojUTekst(41000)).toBe('četrdeset jedna hiljada');
			expect(pretvoriBrojUTekst(42000)).toBe('četrdeset dve hiljade');
			expect(pretvoriBrojUTekst(131000)).toBe('sto trideset jedna hiljada');
			expect(pretvoriBrojUTekst(132555)).toBe(
				'sto trideset dve hiljade petsto pedeset pet'
			);
		});

		it('should handle teen thousands (11-14) without gender changes', () => {
			expect(pretvoriBrojUTekst(12000)).toBe('dvanaest hiljada');
			expect(pretvoriBrojUTekst(13000)).toBe('trinaest hiljada');
			expect(pretvoriBrojUTekst(14000)).toBe('četrnaest hiljada');
			expect(pretvoriBrojUTekst(111000)).toBe('sto jedanaest hiljada');
			expect(pretvoriBrojUTekst(112000)).toBe('sto dvanaest hiljada');
			expect(pretvoriBrojUTekst(113000)).toBe('sto trinaest hiljada');
			expect(pretvoriBrojUTekst(114000)).toBe('sto četrnaest hiljada');
		});

		it('should handle boundary cases for 23, 24 thousand', () => {
			expect(pretvoriBrojUTekst(23000)).toBe('dvadeset tri hiljade');
			expect(pretvoriBrojUTekst(24000)).toBe('dvadeset četiri hiljade');
		});

		it('should handle large, complex thousand numbers', () => {
			expect(pretvoriBrojUTekst(123456)).toBe(
				'sto dvadeset tri hiljade četiristo pedeset šest'
			);
			expect(pretvoriBrojUTekst(999999)).toBe(
				'devetsto devedeset devet hiljada devetsto devedeset devet'
			);
		});
	});

	// --- MILLIONS ---
	describe('Millions', () => {
		it('should handle "milion" (singular) correctly', () => {
			expect(pretvoriBrojUTekst(1000000)).toBe('jedan milion');
			expect(pretvoriBrojUTekst(21000000)).toBe('dvadeset jedan milion');
			expect(pretvoriBrojUTekst(31000000)).toBe('trideset jedan milion');
			expect(pretvoriBrojUTekst(41000000)).toBe('četrdeset jedan milion');
			expect(pretvoriBrojUTekst(51000000)).toBe('pedeset jedan milion');
			expect(pretvoriBrojUTekst(101000000)).toBe('sto jedan milion');
		});

		it('should handle "miliona" (plural) correctly', () => {
			expect(pretvoriBrojUTekst(2000000)).toBe('dva miliona');
			expect(pretvoriBrojUTekst(5000000)).toBe('pet miliona');
			expect(pretvoriBrojUTekst(10000000)).toBe('deset miliona');
		});

		it('should handle teen millions (11-14) with plural form', () => {
			expect(pretvoriBrojUTekst(12000000)).toBe('dvanaest miliona');
			expect(pretvoriBrojUTekst(13000000)).toBe('trinaest miliona');
			expect(pretvoriBrojUTekst(14000000)).toBe('četrnaest miliona');
		});

		it('should handle complex numbers with millions', () => {
			const expected =
				'dva miliona trista četrdeset pet hiljada šeststo sedamdeset osam';
			expect(pretvoriBrojUTekst(2345678)).toBe(expected);
		});
	});

	// --- BILLIONS ---
	describe('Billions', () => {
		it('should handle singular "milijarda"', () => {
			expect(pretvoriBrojUTekst(1000000000)).toBe('jedna milijarda');
		});

		it('should handle plural "milijardi"', () => {
			expect(pretvoriBrojUTekst(2000000000)).toBe('dve milijarde');
			expect(pretvoriBrojUTekst(5000000000)).toBe('pet milijardi');
			expect(pretvoriBrojUTekst(21000000000)).toBe('dvadeset jedna milijarda');
		});

		it('should handle teen billions (11-14) with plural form', () => {
			expect(pretvoriBrojUTekst(11000000000)).toBe('jedanaest milijardi');
			expect(pretvoriBrojUTekst(12000000000)).toBe('dvanaest milijardi');
			expect(pretvoriBrojUTekst(13000000000)).toBe('trinaest milijardi');
			expect(pretvoriBrojUTekst(14000000000)).toBe('četrnaest milijardi');
			expect(pretvoriBrojUTekst(111000000000)).toBe('sto jedanaest milijardi');
		});

		it('should handle complex billions', () => {
			expect(pretvoriBrojUTekst(1234567890)).toBe(
				'jedna milijarda dvesta trideset četiri miliona petsto šezdeset sedam hiljada osamsto devedeset'
			);
		});
	});

	// --- TRILLIONS ---
	describe('Trillions', () => {
		it('should handle singular "bilion"', () => {
			expect(pretvoriBrojUTekst(1000000000000)).toBe('jedan bilion');
		});

		it('should handle plural "biliona"', () => {
			expect(pretvoriBrojUTekst(2000000000000)).toBe('dva biliona');
			expect(pretvoriBrojUTekst(5000000000000)).toBe('pet biliona');
		});
	});

	// --- NEGATIVE NUMBERS ---
	describe('Negative Numbers', () => {
		it('should correctly prepend "minus" to the number', () => {
			expect(pretvoriBrojUTekst(-1)).toBe('minus jedan');
			expect(pretvoriBrojUTekst(-99)).toBe('minus devedeset devet');
			expect(pretvoriBrojUTekst(-12345)).toBe(
				'minus dvanaest hiljada trista četrdeset pet'
			);
		});

		it('should handle negative millions and billions', () => {
			expect(pretvoriBrojUTekst(-1000000)).toBe('minus jedan milion');
			expect(pretvoriBrojUTekst(-5000000)).toBe('minus pet miliona');
			expect(pretvoriBrojUTekst(-1000000000)).toBe('minus jedna milijarda');
		});

		it('should handle negative zero', () => {
			expect(pretvoriBrojUTekst(-0)).toBe('nula');
		});
	});

	// --- NUMBERS WITH ZERO CHUNKS ---
	describe('Numbers with Zero Chunks', () => {
		it('should handle numbers with zeros in middle chunks', () => {
			expect(pretvoriBrojUTekst(1000001)).toBe('jedan milion jedan');
			expect(pretvoriBrojUTekst(1000100)).toBe('jedan milion sto');
			expect(pretvoriBrojUTekst(1001000)).toBe('jedan milion hiljadu');
			expect(pretvoriBrojUTekst(2000001)).toBe('dva miliona jedan');
		});

		it('should handle billions with zero chunks', () => {
			expect(pretvoriBrojUTekst(1000000001)).toBe('jedna milijarda jedan');
			expect(pretvoriBrojUTekst(5000000000)).toBe('pet milijardi');
		});
	});

	// --- BOUNDARY NUMBERS ---
	describe('Boundary Numbers', () => {
		it('should handle common round numbers in thousands', () => {
			expect(pretvoriBrojUTekst(10000)).toBe('deset hiljada');
			expect(pretvoriBrojUTekst(100000)).toBe('sto hiljada');
			expect(pretvoriBrojUTekst(200000)).toBe('dvesta hiljada');
			expect(pretvoriBrojUTekst(400000)).toBe('četiristo hiljada');
		});

		it('should handle boundary numbers before round values', () => {
			expect(pretvoriBrojUTekst(9999)).toBe(
				'devet hiljada devetsto devedeset devet'
			);
			expect(pretvoriBrojUTekst(99999)).toBe(
				'devedeset devet hiljada devetsto devedeset devet'
			);
			expect(pretvoriBrojUTekst(9999999)).toBe(
				'devet miliona devetsto devedeset devet hiljada devetsto devedeset devet'
			);
		});
	});

	// --- MULTIPLE GENDER TRANSFORMATIONS ---
	describe('Multiple Gender Transformations', () => {
		it('should handle numbers with multiple "jedna" transformations', () => {
			expect(pretvoriBrojUTekst(21021)).toBe(
				'dvadeset jedna hiljada dvadeset jedan'
			);
			expect(pretvoriBrojUTekst(1021021)).toBe(
				'jedan milion dvadeset jedna hiljada dvadeset jedan'
			);
		});

		it('should handle numbers with multiple "dve" transformations', () => {
			expect(pretvoriBrojUTekst(22022)).toBe(
				'dvadeset dve hiljade dvadeset dva'
			);
			expect(pretvoriBrojUTekst(2022022)).toBe(
				'dva miliona dvadeset dve hiljade dvadeset dva'
			);
		});

		it('should handle mixed gender transformations', () => {
			expect(pretvoriBrojUTekst(21022)).toBe(
				'dvadeset jedna hiljada dvadeset dva'
			);
			expect(pretvoriBrojUTekst(22021)).toBe(
				'dvadeset dve hiljade dvadeset jedan'
			);
		});
	});

	// --- INVALID INPUTS ---
	describe('Invalid Inputs', () => {
		it('should handle Infinity and NaN', () => {
			expect(pretvoriBrojUTekst(Infinity)).toBe('Neispravan unos');
			expect(pretvoriBrojUTekst(-Infinity)).toBe('Neispravan unos');
			expect(pretvoriBrojUTekst(NaN)).toBe('Neispravan unos');
		});

		it('should handle numbers larger than MAX_SAFE_INTEGER', () => {
			expect(pretvoriBrojUTekst(Number.MAX_SAFE_INTEGER + 1)).toBe(
				'Broj je prevelik za preciznu konverziju.'
			);
		});

		it('should handle MAX_SAFE_INTEGER itself', () => {
			// 9007199254740991 - should contain biliona
			const result = pretvoriBrojUTekst(Number.MAX_SAFE_INTEGER);
			expect(result).toContain('biliona');
		});

		it('should reject string inputs', () => {
			// @ts-expect-error - intentionally testing runtime behavior
			expect(pretvoriBrojUTekst('123')).toBe('Neispravan unos');
			// @ts-expect-error
			expect(pretvoriBrojUTekst('hello')).toBe('Neispravan unos');
		});

		it('should reject boolean inputs', () => {
			// @ts-expect-error
			expect(pretvoriBrojUTekst(true)).toBe('Neispravan unos');
			// @ts-expect-error
			expect(pretvoriBrojUTekst(false)).toBe('Neispravan unos');
		});

		it('should reject object inputs', () => {
			// @ts-expect-error
			expect(pretvoriBrojUTekst({})).toBe('Neispravan unos');
			// @ts-expect-error
			expect(pretvoriBrojUTekst([])).toBe('Neispravan unos');
			// @ts-expect-error
			expect(pretvoriBrojUTekst({ value: 5 })).toBe('Neispravan unos');
		});
	});

	// --- EDGE CASES & BUG VERIFICATION ---
	describe('Edge Cases and Bug Verification', () => {
		it('[BUG] should handle plural "miliona" for numbers ending in 11, 12, etc.', () => {
			// The original code fails this test, producing "jedanaest milion".
			expect(pretvoriBrojUTekst(11000000)).toBe('jedanaest miliona');
			// The original code fails this test, producing "sto jedanaest milion".
			expect(pretvoriBrojUTekst(111000000)).toBe('sto jedanaest miliona');
		});

		it('[BUG] should not produce double spaces for numbers with zero parts', () => {
			// The original code might produce "jedan milion  hiljadu jedan". This test expects clean output.
			expect(pretvoriBrojUTekst(1001001)).toBe('jedan milion hiljadu jedan');
			expect(pretvoriBrojUTekst(5000005)).toBe('pet miliona pet');
			expect(pretvoriBrojUTekst(1000000)).toBe('jedan milion');
		});

		it('should handle a large number within its current limits', () => {
			const expected =
				'devetsto devedeset devet miliona devetsto devedeset devet hiljada devetsto devedeset devet';
			expect(pretvoriBrojUTekst(999999999)).toBe(expected);
		});
	});
});

// --- Word Definitions ---
const jedinice = [
	'',
	'jedan',
	'dva',
	'tri',
	'četiri',
	'pet',
	'šest',
	'sedam',
	'osam',
	'devet'
];
const desetice = [
	'',
	'',
	'dvadeset',
	'trideset',
	'četrdeset',
	'pedeset',
	'šezdeset',
	'sedamdeset',
	'osamdeset',
	'devedeset'
];
const teens = [
	'deset',
	'jedanaest',
	'dvanaest',
	'trinaest',
	'četrnaest',
	'petnaest',
	'šesnaest',
	'sedamnaest',
	'osamnaest',
	'devetnaest'
];
const stotine: { [key: number]: string } = {
	1: 'sto',
	2: 'dvesta',
	3: 'trista',
	4: 'četiristo'
};

const denominations = [
	'',
	'hiljada', // Thousands
	'miliona', // Millions
	'milijardi', // Billions
	'biliona' // Trillions
	// Can be extended further
];

/**
 * Converts a number chunk (0-999) into its word representation.
 * This is the core building block for larger numbers.
 * @param num - A number between 0 and 999.
 * @returns An array of string parts for the chunk.
 */
const convertThreeDigits = (num: number): string[] => {
	if (num === 0) return [];
	if (num > 999 || num < 0) {
		throw new Error(
			'convertThreeDigits can only handle numbers between 0 and 999.'
		);
	}

	const parts: string[] = [];
	const stotina = Math.floor(num / 100);
	const ostatak = num % 100;

	// Handle hundreds
	if (stotina > 0) {
		// Use the map or construct the word dynamically for 500, 600, etc.
		parts.push(stotine[stotina] || jedinice[stotina] + 'sto');
	}

	// Handle tens and units
	if (ostatak > 0) {
		if (ostatak < 10) {
			parts.push(jedinice[ostatak]); // 1-9
		} else if (ostatak < 20) {
			parts.push(teens[ostatak - 10]); // 10-19
		} else {
			const desetica = Math.floor(ostatak / 10);
			const jedinica = ostatak % 10;
			parts.push(desetice[desetica]);
			if (jedinica > 0) {
				parts.push(jedinice[jedinica]);
			}
		}
	}

	return parts;
};

/**
 * Applies the correct Serbian grammatical suffix to a denomination.
 * @param chunkValue - The numeric value of the chunk (e.g., 1, 2, 5, 21).
 * @param denominationIndex - The index from the `denominations` array.
 * @returns The correctly conjugated denomination string.
 */
const getDenomination = (
	chunkValue: number,
	denominationIndex: number
): string => {
	if (chunkValue === 0 || denominationIndex === 0) {
		return '';
	}

	const denomination = denominations[denominationIndex];
	const lastDigit = chunkValue % 10;
	const lastTwoDigits = chunkValue % 100;

	// Rule for 'hiljada' vs 'hiljade' vs 'hiljadu'
	if (denomination === 'hiljada') {
		if (chunkValue === 1) {
			return 'hiljadu'; // Special case only for 1000.
		}
		if (
			[2, 3, 4].includes(lastDigit) &&
			![12, 13, 14].includes(lastTwoDigits)
		) {
			return 'hiljade'; // e.g., 2 hiljade, 24 hiljade
		}
		return 'hiljada'; // e.g., 5 hiljada, 11 hiljada, 21 hiljada
	}

	// Rule for 'milijardi' vs 'milijarde' vs 'milijarda'
	if (denomination === 'milijardi') {
		if (lastDigit === 1 && lastTwoDigits !== 11) {
			return 'milijarda'; // Singular feminine: 1, 21, 31, 41...
		}
		if (
			[2, 3, 4].includes(lastDigit) &&
			![12, 13, 14].includes(lastTwoDigits)
		) {
			return 'milijarde'; // e.g., 2 milijarde, 24 milijarde
		}
		return 'milijardi'; // e.g., 5 milijardi, 11 milijardi, 25 milijardi
	}

	// Rule for 'milion' vs 'miliona' (and others)
	if (lastDigit === 1 && lastTwoDigits !== 11) {
		// Singular form (milion)
		return denomination.slice(0, -1);
	}

	// Default plural form
	return denomination;
};

/**
 * Converts a number to its word representation in Serbian using an array-based approach.
 * @param num - The number to convert.
 * @returns The number in words as a string.
 */
export default (num: number): string => {
	// The provided tests expect null/undefined to be treated as 0.
	if (num === null || typeof num === 'undefined' || num === 0) {
		return 'nula';
	}
	if (typeof num !== 'number' || !isFinite(num)) {
		return 'Neispravan unos';
	}

	const isNegative = num < 0;
	const absNum = Math.abs(num);

	if (absNum > Number.MAX_SAFE_INTEGER) {
		return 'Broj je prevelik za preciznu konverziju.';
	}

	const finalParts: string[] = [];
	const numStr = String(absNum);
	const chunks: number[] = [];

	// Split the number string into chunks of 3 from the right
	for (let i = numStr.length; i > 0; i -= 3) {
		chunks.push(parseInt(numStr.substring(Math.max(0, i - 3), i), 10));
	}

	// Process each chunk from right to left (hundreds, thousands, millions...)
	chunks.forEach((chunkValue, i) => {
		if (chunkValue === 0) {
			return; // Skip empty chunks
		}

		const denomination = getDenomination(chunkValue, i);
		let chunkParts = convertThreeDigits(chunkValue);

		// For 1000, we want "hiljadu", not "jedna hiljadu".
		// This special case only applies when the thousands chunk is exactly 1.
		if (i === 1 && chunkValue === 1) {
			chunkParts = [];
		}

		// Special grammatical gender changes for thousands and billions (feminine nouns)
		// i=1 (thousands), i=3 (billions)
		const feminineDenominationIndices = [1, 3];
		if (feminineDenominationIndices.includes(i)) {
			const lastWord = chunkParts[chunkParts.length - 1];
			if (lastWord === 'jedan') chunkParts[chunkParts.length - 1] = 'jedna';
			if (lastWord === 'dva') chunkParts[chunkParts.length - 1] = 'dve';
		}

		// Add the denomination after the chunk words
		finalParts.unshift(denomination);
		finalParts.unshift(...chunkParts);
	});

	if (isNegative) {
		finalParts.unshift('minus');
	}

	// Join all parts with a single space, filter out any empty strings
	return finalParts.filter(Boolean).join(' ');
};

# Brojevi u tekst

[![npm version](https://img.shields.io/npm/v/brojevi-u-tekst.svg)](https://www.npmjs.com/package/brojevi-u-tekst)
[![npm downloads](https://img.shields.io/npm/dm/brojevi-u-tekst.svg)](https://www.npmjs.com/package/brojevi-u-tekst)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

A lightweight, zero-dependency TypeScript library for converting numbers to Serbian words.

Handles Serbian grammatical cases, gender agreement, and plural forms correctly.

## Installation

```bash
npm install brojevi-u-tekst
```

## Usage

```typescript
import brojeviUTekst from 'brojevi-u-tekst';

brojeviUTekst(12345);
// "dvanaest hiljada trista četrdeset pet"

brojeviUTekst(21000);
// "dvadeset jedna hiljada"

brojeviUTekst(-99);
// "minus devedeset devet"
```

## Examples

| Input           | Output                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `0`             | nula                                                                                           |
| `19`            | devetnaest                                                                                     |
| `-42`           | minus četrdeset dva                                                                            |
| `100`           | sto                                                                                            |
| `400`           | četiristo                                                                                      |
| `1000`          | hiljadu                                                                                        |
| `2000`          | dve hiljade                                                                                    |
| `5000`          | pet hiljada                                                                                    |
| `21000`         | dvadeset jedna hiljada                                                                         |
| `123456`        | sto dvadeset tri hiljade četiristo pedeset šest                                                |
| `1000000`       | jedan milion                                                                                   |
| `2000000`       | dva miliona                                                                                    |
| `11000000`      | jedanaest miliona                                                                              |
| `1000000000`    | jedna milijarda                                                                                |
| `2000000000`    | dve milijarde                                                                                  |
| `1000000000000` | jedan bilion                                                                                   |
| `1234567890`    | jedna milijarda dvesta trideset četiri miliona petsto šezdeset sedam hiljada osamsto devedeset |
| `Infinity`      | Neispravan unos                                                                                |
| `NaN`           | Neispravan unos                                                                                |
| `> MAX_SAFE`    | Broj je prevelik za preciznu konverziju.                                                       |

## API

### `brojeviUTekst(num: number): string`

Converts a number to its Serbian word representation.

**Parameters:**

- `num` (number) - The number to convert. Supports positive and negative integers up to `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991). `null` and `undefined` are treated as `0`.

**Returns:**

- (string) - The Serbian word representation
  - Returns `"nula"` for 0, null, or undefined
  - Returns `"Neispravan unos"` for non-finite numbers (Infinity, NaN) or invalid types
  - Returns `"Broj je prevelik za preciznu konverziju."` for numbers exceeding MAX_SAFE_INTEGER

## Features

- ✅ Correct Serbian grammar for all denominations:
  - _hiljadu/hiljade/hiljada_ (thousands)
  - _milion/miliona_ (millions)
  - _milijarda/milijarde/milijardi_ (billions)
  - _bilion/biliona_ (trillions)
- ✅ Gender agreement for feminine nouns (_jedan→jedna_, _dva→dve_ for thousands and billions)
- ✅ Support for numbers up to `Number.MAX_SAFE_INTEGER` (~9 quadrillion)
- ✅ Negative number support (prepends "minus")
- ✅ Proper handling of edge cases (zero chunks, teens, invalid inputs)
- ✅ Zero dependencies
- ✅ Fully typed (TypeScript)

## License

MIT

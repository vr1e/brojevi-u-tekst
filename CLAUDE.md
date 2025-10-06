# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `brojevi-u-tekst`, a TypeScript library that converts numbers to their Serbian word representations (e.g., 123 → "sto dvadeset tri"). It handles Serbian grammatical rules including gender changes, plural forms, and special cases for thousands, millions, and billions.

## Commands

### Development

- **Run tests**: `npm test` (watch mode)
- **Run tests once**: `npm test -- --run`
- **Build**: `npm run build` (removes dist/ and compiles TypeScript)
- **Format**: `npm run format` (runs Prettier on TS and MD files)
- **Pre-publish**: `npm run prepublishOnly` (runs tests once + build)

### Running a single test

Use Vitest's `-t` flag to run a specific test by name:

```bash
npm test -- -t "should handle zero"
```

## Architecture

The conversion logic in `src/index.ts` uses a **chunk-based approach**:

1. **Number chunking**: Numbers are split into 3-digit chunks from right to left (e.g., 123456 → [456, 123])
2. **Chunk conversion**: Each chunk (0-999) is converted via `convertThreeDigits()` which handles hundreds, tens, and units
3. **Denomination assignment**: Chunks are labeled with denominations (hiljada, miliona, milijardi) via `getDenomination()`
4. **Grammatical rules**: Serbian grammar is applied:
   - Gender changes for thousands: "jedan" → "jedna", "dva" → "dve"
   - Special plural forms: "hiljadu" (1000), "hiljade" (2-4 thousands), "hiljada" (5+ thousands)
   - Singular/plural for millions/billions based on last digit

### Key Data Structures

- `jedinice[]`, `desetice[]`, `teens[]`: Word mappings for basic numbers (1-9, 20-90, 10-19)
- `stotine{}`: Object mapping for hundreds (100="sto", 200="dvesta", 300="trista", 400="četiristo"); 500+ are dynamically constructed
- `denominations[]`: Scale words (hiljada, miliona, milijardi, biliona)

### Critical Logic Locations

- `convertThreeDigits()` (src/index.ts:60): Core 3-digit chunk converter
- `getDenomination()` (src/index.ts:103): Handles Serbian plural/singular rules for all denominations
- Gender transformation (src/index.ts:198-205): Converts "jedan"→"jedna" and "dva"→"dve" for feminine nouns (thousands/billions)

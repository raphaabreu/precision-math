/*
 * Copyright (C) 2018 Raphael Lorenzeto de Abreu <raphael.lorenzeto@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { InvalidPrecisionError } from "./Errors/InvalidPrecisionError";
import { InvalidValueError } from "./Errors/InvalidValueError";
import { UnsafeCalculationError } from "./Errors/UnsafeCalculationError";
import { Precision } from "./Model/Precision";

/**
 * Calculate how many fraction digits are in a given precision.
 */
export function fractionDigits(precision: Precision): number {
    if (precision > 1) {
        throw new InvalidPrecisionError();
    }
    return Math.log10(1 / precision);
}

/**
 * Calculate by how much you have to divide to reach the desired precision.
 */
export function precisionDivisor(precision: Precision): number {
    if (precision > 1) {
        throw new InvalidPrecisionError();
    }
    return Math.round(1 / precision);
}

/**
 * Transforms the float number into an integer using the given precision.
 */
export function toInt(value: number, precision: Precision): number {
    const answer = Math.round(value * precisionDivisor(precision));
    if (answer > Number.MAX_SAFE_INTEGER || answer < Number.MIN_SAFE_INTEGER) {
        throw new UnsafeCalculationError();
    }
    return answer;
}

/**
 * Transforms the integer into a float using the given precision.
 */
export function toFloat(value: number, precision: Precision): number {
    if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
        throw new UnsafeCalculationError();
    }
    return Math.round(value) / precisionDivisor(precision);
}

/**
 * Rounds the value given using the desired precision.
 */
export function round(value: number, precision: Precision): number {
    return (
        Math.round(value * precisionDivisor(precision)) /
        precisionDivisor(precision)
    );
}

/**
 * Rounds up the value given using the desired precision.
 */
export function ceil(value: number, precision: Precision): number {
    return (
        Math.ceil(value * precisionDivisor(precision)) /
        precisionDivisor(precision)
    );
}

/**
 * Rounds down the value given using the desired precision.
 */
export function floor(value: number, precision: Precision): number {
    return (
        Math.floor(value * precisionDivisor(precision)) /
        precisionDivisor(precision)
    );
}

/**
 * Adds two given values using the desired precision.
 */
export function add(a: number, b: number, precision: Precision): number {
    return toFloat(
        a * precisionDivisor(precision) + b * precisionDivisor(precision),
        precision
    );
}

/**
 * Subtracts the second value from the first using the desired precision.
 */
export function subtract(a: number, b: number, precision: Precision): number {
    return toFloat(
        a * precisionDivisor(precision) - b * precisionDivisor(precision),
        precision
    );
}

/**
 * Multiply the given values using the desired precision.
 */
export function multiply(a: number, b: number, precision: Precision): number {
    return round(a * b, precision);
}

/**
 * Divide the first value by the second using the desired precision.
 */
export function divide(a: number, b: number, precision: Precision): number {
    return round(a / b, precision);
}

/**
 * Calculates rest of the division of two values using the desired precision.
 */
export function modulo(a: number, b: number, precision: Precision): number {
    return (
        (toInt(a, precision) % toInt(b, precision)) /
        precisionDivisor(precision)
    );
}

/**
 * Calculate the least common multiple between the two indicated values on the desired precision.
 */
export function leastCommonMultiple(
    a: number,
    b: number,
    precision: Precision
): number {
    if (a < 0 || b < 0) {
        throw new InvalidValueError(
            "Not possible to calculate LCM of negative numbers"
        );
    }
    return toFloat(
        toInt(a, precision) *
            toInt(b, precision) /
            toInt(greatestCommonFactor(a, b, precision), precision),
        precision
    );
}

/**
 * Calculate the greatest common factor between the two indicated values on the desired precision.
 */
export function greatestCommonFactor(
    a: number,
    b: number,
    precision: Precision
): number {
    if (a < 0 || b < 0) {
        throw new InvalidValueError(
            "Not possible to calculate GCF of negative numbers"
        );
    }
    if (b === 0) {
        return a;
    } else {
        return greatestCommonFactor(b, modulo(a, b, precision), precision);
    }
}

/**
 * Counts how many decimal places are in the given numeric string representation.
 */
export function countDecimalPlaces(value: string): number {
    const match = ("" + value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
        return 0;
    }
    return Math.max(
        0,
        // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0) -
            // Adjust for scientific notation.
            (match[2] ? +match[2] : 0)
    );
}

/**
 * Return the precision used to represent the given amount with the given quantity of significant digits.
 */
export function precisionFromSignificantDigits(
    amount: number,
    significantDigits: number
): Precision {
    return 10 ** -countDecimalPlaces(amount.toPrecision(significantDigits));
}

/**
 * Creates a string representation of the given value using the precision desired.
 */
export function toFixed(value: number, precision: Precision): string {
    return (value >= 0 ? " " : "") + value.toFixed(fractionDigits(precision));
}

/**
 * Creates a string representation of the given percentage value using the desired precision.
 */
export function toFixedPercentage(value: number, precision: Precision): string {
    return toFixed(value * 100, precision) + "%";
}

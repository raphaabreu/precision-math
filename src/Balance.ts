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

import * as Errors from "./Errors";
import * as Model from "./Model";
import * as PrecisionMath from "./PrecisionMath";
import { Value } from "./Value";

interface INormalizedValueMap {
    map: Model.IValueMap;
    precision: Model.Precision;
}

/**
 * Stores amounts on multiple symbols with an associated precision.
 */
export class Balance implements Model.IBalance {
    /**
     * Adds the given values and return the new instance.
     */
    public static add(
        value: Model.IBalance[] | Model.IValue[]
    ): Model.IBalance {
        return new Balance(1).add(value);
    }

    /**
     * Creates a new Balance by rounding the given value to the given precision.
     */
    public static round(
        value: Model.IBalance | Model.IValue | Model.IValue[] | Model.IValueMap,
        precision: Model.Precision
    ): Model.IBalance {
        const normalized = normalize(value, precision, PrecisionMath.round);

        return new Balance(normalized.map, normalized.precision);
    }

    /**
     * Creates a new Balance by flooring the given value to the given precision.
     */
    public static floor(
        value: Model.IBalance | Model.IValue | Model.IValue[] | Model.IValueMap,
        precision: Model.Precision
    ): Model.IBalance {
        const normalized = normalize(value, precision, PrecisionMath.floor);

        return new Balance(normalized.map, normalized.precision);
    }

    /**
     * Creates a new Balance by ceiling the given value to the given precision.
     */
    public static ceil(
        value: Model.IBalance | Model.IValue | Model.IValue[] | Model.IValueMap,
        precision: Model.Precision
    ): Model.IBalance {
        const normalized = normalize(value, precision, PrecisionMath.ceil);

        return new Balance(normalized.map, normalized.precision);
    }

    /**
     * Map of values present on this Balance.
     */
    public readonly values: Model.IValueMap;

    /**
     * Precision to be used for calculations.
     */
    public readonly precision: Model.Precision;

    /**
     * Creates a new Balance with the given value and precision.
     */
    constructor(precision: Model.Precision);
    constructor(
        value: Model.IBalance | Model.IValue | Model.IValue[],
        precision?: Model.Precision
    );
    constructor(map: Model.IValueMap, precision: Model.Precision);
    constructor(arg1: any, arg2?: any) {
        if (typeof arg1 === "number") {
            this.values = Object.create(null);
            this.precision = arg1;
        } else {
            if (typeof arg2 !== "number") {
                arg2 = 1;
            }

            const normalized = normalize(arg1, arg2);
            this.values = normalized.map;
            this.precision = normalized.precision;
        }
    }

    /**
     * Array of symbols present on this Balance.
     */
    get symbols(): string[] {
        return Object.getOwnPropertyNames(this.values);
    }

    /**
     * Returns the amount registered against the given symbol or returns
     * undefined if the symbol is not present.
     */
    public get(symbol: string): number {
        return this.values[symbol];
    }

    /**
     * Set the amount for the given symbol and return a new instance.
     */
    public set(symbol: string, amount: number): Model.IBalance {
        const newValues: Model.IValueMap = Object.assign(
            Object.create(null),
            this.values
        );

        newValues[symbol] = PrecisionMath.round(amount, this.precision);

        return new Balance(newValues, this.precision);
    }

    /**
     * Removes the given symbol and return a new instance.
     */
    public remove(symbol: string): Model.IBalance {
        const newValues: Model.IValueMap = Object.assign(
            Object.create(null),
            this.values
        );

        delete newValues[symbol];

        return new Balance(newValues, this.precision);
    }

    /**
     * Returns true if the given symbol is present on the IBalance.
     */
    public has(symbol: string): boolean {
        return this.symbols.indexOf(symbol) !== -1;
    }

    /**
     * Returns an instance of Model.IValue representing the amount registered for the
     * given symbol on the IBalance or returns undefined if the symbol is not
     * present.
     */
    public getValue(symbol: string): Model.IValue | undefined {
        if (this.values[symbol] === undefined) {
            return;
        }

        return new Value(this.values[symbol], symbol, this.precision);
    }

    /**
     * Returns an Array of Values representing all the symbols present on the
     * IBalance.
     */
    public toValueArray(): Model.IValue[] {
        const values: Value[] = [];

        for (const symbol of this.symbols) {
            values.push(new Value(this.values[symbol], symbol, this.precision));
        }

        return values;
    }

    /**
     * Modifies the Balance using the provided callback and return the new
     * insance.
     */
    public modify(
        fn: (
            value: number,
            symbol: string,
            precision: Model.Precision,
            originalBalance: Model.IBalance
        ) => number,
        precision?: Model.Precision
    ): Model.IBalance {
        const newValues: Model.IValueMap = Object.create(null);

        if (precision === undefined) {
            precision = this.precision;
        }

        for (const symbol of this.symbols) {
            newValues[symbol] = fn(
                this.values[symbol],
                symbol,
                precision,
                this
            );
        }

        return new Balance(newValues, precision);
    }

    /**
     * Calculates the positive amounts of all symbols and return the new
     * instance.
     */
    public abs(): Model.IBalance {
        return this.modify(value => Math.abs(value));
    }

    /**
     * Removes all zero-amount symbols and return the new instance.
     */
    public removeZeroes(): Model.IBalance {
        const newValues: Model.IValueMap = Object.assign(
            Object.create(null),
            this.values
        );

        for (const symbol of this.symbols) {
            if (newValues[symbol] === 0) {
                delete newValues[symbol];
            }
        }

        return new Balance(newValues, this.precision);
    }

    /**
     * Returns true if the Balance has any symbols with zero amounts.
     */
    public isZero(): boolean {
        for (const symbol of this.symbols) {
            if (this.values[symbol] !== 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * Adds the given values and return the new instance.
     */
    public add(
        value:
            | Model.IBalance
            | Model.IValueMap
            | Model.IValue
            | Model.IBalance[]
            | Model.IValueMap[]
            | Model.IValue[]
    ): Model.IBalance {
        const newValues: Model.IValueMap = Object.assign(
            Object.create(null),
            this.values
        );
        let precision = this.precision;
        const normalizedValues: INormalizedValueMap[] = normalizeList(
            value,
            precision,
            PrecisionMath.round
        );

        for (const item of normalizedValues) {
            precision = Math.min(precision, item.precision);

            for (const symbol of Object.getOwnPropertyNames(item.map)) {
                if (symbol in newValues) {
                    newValues[symbol] = PrecisionMath.add(
                        newValues[symbol],
                        item.map[symbol],
                        precision
                    );
                } else {
                    newValues[symbol] = item.map[symbol];
                }
            }
        }

        return new Balance(newValues, precision);
    }

    /**
     * Subtracts the given values and return the new instance.
     */
    public subtract(
        value:
            | Model.IBalance
            | Model.IValueMap
            | Model.IValue
            | Model.IBalance[]
            | Model.IValueMap[]
            | Model.IValue[]
    ): Model.IBalance {
        const newValues: Model.IValueMap = Object.assign(
            Object.create(null),
            this.values
        );
        let precision = this.precision;
        const normalizedValues: INormalizedValueMap[] = normalizeList(
            value,
            precision,
            PrecisionMath.round
        );

        for (const item of normalizedValues) {
            precision = Math.min(precision, item.precision);

            for (const symbol of Object.getOwnPropertyNames(item.map)) {
                if (symbol in newValues) {
                    newValues[symbol] = PrecisionMath.subtract(
                        newValues[symbol],
                        item.map[symbol],
                        precision
                    );
                } else {
                    newValues[symbol] = -item.map[symbol];
                }
            }
        }

        return new Balance(newValues, precision);
    }

    /**
     * Multiplies the Balance by the provided factors and return the new instance.
     */
    public multiply(...factors: number[]): Model.IBalance {
        let finalFactor: number = 1;

        for (const factor of factors) {
            finalFactor *= factor;
        }

        return this.modify(value =>
            PrecisionMath.multiply(value, finalFactor, this.precision)
        );
    }

    /**
     * Divides the Balance by the provided factors and return the new instance.
     */
    public divide(...factors: number[]): Model.IBalance {
        let finalFactor: number = 1;

        for (const factor of factors) {
            finalFactor *= 1 / factor;
        }

        return this.modify(value =>
            PrecisionMath.multiply(value, finalFactor, this.precision)
        );
    }

    /**
     * Converts the Balance to the given currency using the specified rate lookup callback.
     */
    public convertTo(
        currency: string,
        getRate: (
            toSymbol: string,
            fromSymbol: string,
            conversionPrecision: Model.Precision,
            originalValue: Model.IValue
        ) => Promise<number>,
        precision?: Model.Precision
    ): Promise<Model.IValue> {
        const promises = this.toValueArray().map(value =>
            value.convertTo(currency, getRate, precision)
        );

        return Promise.all(promises).then(values =>
            values.reduce(
                (a, b) => (a = a.add(b)),
                new Value(0, currency, this.precision)
            )
        );
    }

    /**
     * Converts the Balance in sync to the given currency using the specified rate lookup callback.
     */
    public convertToSync(
        currency: string,
        getRate: (
            toSymbol: string,
            fromSymbol: string,
            conversionPrecision: Model.Precision,
            originalValue: Model.IValue
        ) => number,
        precision?: Model.Precision
    ): Model.IValue {
        return this.toValueArray()
            .map(value => value.convertToSync(currency, getRate, precision))
            .reduce(
                (a, b) => (a = a.add(b)),
                new Value(0, currency, this.precision)
            );
    }

    /**
     * Rounds the amounts to the given precision and return a new instance.
     */
    public round(precision: Model.Precision): Model.IBalance {
        return this.modify(
            value => PrecisionMath.round(value, precision),
            precision
        );
    }

    /**
     * Returns the string representation of the Balance.
     */
    public toString(): string {
        return "{ " + this.toValueArray().join(", ") + " }";
    }
}

function normalize(
    item: any,
    precision: Model.Precision,
    rounding?: (amount: number, precision: Model.Precision) => number
): INormalizedValueMap {
    // Balances get their values copied
    if (item instanceof Balance) {
        return {
            map: Object.assign(Object.create(null), item.values),
            precision: Math.min(item.precision, precision)
        };
    }

    const normalized: INormalizedValueMap = {
        map: Object.create(null),
        precision
    };

    // Undefined -> {}
    if (item === undefined || item === null) {
        return normalized;
    }

    // Values -> {symbol: amount}
    if (
        typeof (item as Value).symbol === "string" &&
        typeof (item as Value).amount === "number" &&
        typeof (item as Value).precision === "number"
    ) {
        normalized.map[item.symbol] = item.amount;
        normalized.precision = Math.min(normalized.precision, item.precision);
        return normalized;
    }

    // Arrays
    if (Array.isArray(item)) {
        for (const element of item) {
            const normalizedItem = normalize(element, precision, rounding);

            for (const symbol of Object.getOwnPropertyNames(
                normalizedItem.map
            )) {
                // Throws an error if a symbol is repeated.
                if (symbol in normalized.map) {
                    throw new Errors.InvalidValueError(
                        "Operation invalid due to repeated symbols: " + symbol
                    );
                }

                normalized.map[symbol] = normalizedItem.map[symbol];
            }

            normalized.precision = Math.min(
                normalized.precision,
                normalizedItem.precision
            );
        }
        return normalized;
    }

    // Objects with only number properties are turned into {symbol: amount} and added
    if (typeof item === "object") {
        for (const property of Object.getOwnPropertyNames(item)) {
            // Throws an error if object has property that is not a number.
            if (typeof item[property] !== "number") {
                throw new Errors.InvalidValueError(
                    `Cannot convert obj['${property}'] = '${typeof item[
                        property
                    ]}' to Value.`
                );
            }

            if (rounding !== undefined) {
                normalized.map[property] = rounding(item[property], precision);
            } else {
                normalized.map[property] = PrecisionMath.round(
                    item[property],
                    precision
                );

                if (
                    process.env.STRICT_PRECISION !== undefined &&
                    normalized.map[property] !== Number(item[property])
                ) {
                    throw new Errors.UnsafeCalculationError(
                        `The amount ${
                            item[property]
                        } cannot be represented using the precision ${precision} without loss of information.`
                    );
                }
            }
        }
        return normalized;
    }

    // Otherwise not supported
    throw new Errors.InvalidValueError(
        `Cannot convert '${typeof item}' to Value: ${item}.`
    );
}

function normalizeList(
    list: any,
    precision: Model.Precision,
    rounding: (amount: number, precision: Model.Precision) => number
): INormalizedValueMap[] {
    // If not array, return list with single normalization
    if (!Array.isArray(list)) {
        return [normalize(list, precision, rounding)];
    }

    // Otherwise, normalize each element and add it to array
    let normalized: INormalizedValueMap[] = [];

    for (const element of list) {
        normalized = normalized.concat(
            normalizeList(element, precision, rounding)
        );
    }

    return normalized;
}

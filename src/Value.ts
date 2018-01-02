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

import * as Model from "./Model";
import * as PrecisionMath from "./PrecisionMath";

/**
 * Represents an amount on a symbol using a specific precision.
 */
export class Value implements Model.IValue {
    /**
     * Numeric amount represented by the Value.
     */
    public readonly amount: number;

    /**
     * Symbol to which the Value is related.
     */
    public readonly symbol: string;

    /**
     * Precision to be used for calculations.
     */
    public readonly precision: Model.Precision;

    /**
     * Creates a new Value with the given amount, symbol and precision.
     */
    constructor(amount: number, symbol: string, precision: Model.Precision) {
        if (Number.isNaN(amount)) {
            throw new Error("Amount is not a number.");
        }
        if (!symbol) {
            throw new Error("Symbol is required.");
        }
        if (Number.isNaN(precision)) {
            throw new Error("Precision is not a number.");
        }

        this.amount = PrecisionMath.round(amount, precision);
        this.symbol = symbol;
        this.precision = precision;
    }

    /**
     * Calculate the absolute amount and return the new instance.
     */
    public abs(): Model.IValue {
        return new Value(Math.abs(this.amount), this.symbol, this.precision);
    }

    /**
     * Adds all given Values to this one and return the new instance.
     */
    public add(...values: Model.IValue[]): Model.IValue {
        let total: number = this.amount;
        let minPrecision: number = this.precision;

        for (const value of values) {
            this.validateOperation(value);

            minPrecision = Math.min(minPrecision, value.precision);
            total = PrecisionMath.add(total, value.amount, minPrecision);
        }

        return new Value(total, this.symbol, minPrecision);
    }

    /**
     * Subtracts all given Values from this one and return the new instance.
     */
    public subtract(...values: Model.IValue[]): Model.IValue {
        let total: number = this.amount;
        let minPrecision: number = this.precision;

        for (const value of values) {
            this.validateOperation(value);

            minPrecision = Math.min(minPrecision, value.precision);
            total = PrecisionMath.subtract(total, value.amount, minPrecision);
        }

        return new Value(total, this.symbol, minPrecision);
    }

    /**
     * Multiplies the Value by all given factors and return the new instance.
     */
    public multiply(...factors: number[]): Model.IValue {
        let finalFactor: number = 1;

        for (const factor of factors) {
            finalFactor *= factor;
        }

        return new Value(
            PrecisionMath.multiply(this.amount, finalFactor, this.precision),
            this.symbol,
            this.precision
        );
    }

    /**
     * Divides the Value by all given factors and return the new instance.
     */
    public divide(...factors: number[]): Model.IValue {
        let finalFactor: number = 1;

        for (const factor of factors) {
            finalFactor *= 1 / factor;
        }

        return new Value(
            PrecisionMath.multiply(this.amount, finalFactor, this.precision),
            this.symbol,
            this.precision
        );
    }

    /**
     * Converts the Value to the given currency using the specified rate lookup callback and optional custom precision.
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
        // Precision defaults to current in use by value.
        const precisionToUse =
            precision === undefined ? this.precision : precision;

        // If the symbol converting to is the same of the value.
        if (this.symbol === currency) {
            if (precisionToUse === this.precision) {
                // If the precision is the same, return this.
                return Promise.resolve(this);
            } else {
                // Otherwise return a new value with same amount and symbol but custom precision.
                return Promise.resolve(
                    new Value(
                        PrecisionMath.round(this.amount, precisionToUse),
                        this.symbol,
                        precisionToUse
                    )
                );
            }
        }

        // Zero-balance amounts just change symbols.
        if (this.amount === 0) {
            return Promise.resolve(
                new Value(this.amount, currency, precisionToUse)
            );
        }

        // Otherwise fetch rate and return new value.
        return getRate(currency, this.symbol, precisionToUse, this).then(
            rate =>
                new Value(
                    PrecisionMath.multiply(this.amount, rate, precisionToUse),
                    currency,
                    precisionToUse
                )
        );
    }

    /**
     * Converts the Value in sync to the given currency using the specified rate lookup callback and optional custom precision.
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
        // Precision defaults to current in use by value.
        const precisionToUse =
            precision === undefined ? this.precision : precision;

        // If the symbol converting to is the same of the value.
        if (this.symbol === currency) {
            if (precisionToUse === this.precision) {
                // If the precision is the same, return this.
                return this;
            } else {
                // Otherwise return a new value with same amount and symbol but custom precision.
                return new Value(
                    PrecisionMath.round(this.amount, precisionToUse),
                    this.symbol,
                    precisionToUse
                );
            }
        }

        // Zero-balance amounts just change symbols.
        if (this.amount === 0) {
            return new Value(this.amount, currency, precisionToUse);
        }

        // Otherwise fetch rate and return new value.
        return new Value(
            PrecisionMath.multiply(
                this.amount,
                getRate(currency, this.symbol, precisionToUse, this),
                precisionToUse
            ),
            currency,
            precisionToUse
        );
    }

    /**
     * Rounds the Model.IValue to the given precision and return a new instance.
     */
    public round(precision: Model.Precision): Model.IValue {
        return new Value(this.amount, this.symbol, precision);
    }

    /**
     * Returns the string representation of the Value.
     */
    public toString(): string {
        return (
            PrecisionMath.toFixed(this.amount, this.precision) +
            " " +
            this.symbol
        );
    }

    private validateOperation(value: Model.IValue): void {
        if (value.symbol !== this.symbol) {
            throw new Error(
                `Cannot operate values with different symbols ${
                    value.symbol
                } / ${this.symbol}.`
            );
        }

        return;
    }
}

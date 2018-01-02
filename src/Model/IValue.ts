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

import { IConvertible } from "./IConvertible";
import { Precision } from "./Precision";

/**
 * Interface that describes an amount on a symbol using a specific precision.
 */
export interface IValue extends IConvertible {
    /**
     * Numeric amount represented by the IValue.
     */
    readonly amount: number;

    /**
     * Symbol to which the IValue is related.
     */
    readonly symbol: string;

    /**
     * Precision to be used for calculations.
     */
    readonly precision: Precision;

    /**
     * Calculate the absolute amount and return the new instance.
     */
    abs(): IValue;

    /**
     * Adds all given IValues to this one and return the new instance.
     */
    add(...values: IValue[]): IValue;

    /**
     * Subtracts all given IValues from this one and return the new instance.
     */
    subtract(...values: IValue[]): IValue;

    /**
     * Multiplies the IValue by all given factors and return the new instance.
     */
    multiply(...factors: number[]): IValue;

    /**
     * Divides the IValue by all given factors and return the new instance.
     */
    divide(...factors: number[]): IValue;

    /**
     * Rounds the IValue to the given precision and return a new instance.
     */
    round(precision: Precision): IValue;

    /**
     * Returns the string representation of the IValue.
     */
    toString(): string;
}

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

/**
 * Multi dimensional vector.
 */
export interface IVector {
    [key: string]: number | undefined;
}

/**
 * The name and value of a single dimension in a vector.
 */
export interface IDimensionValuePair {
    dimension: string;
    amount: number | undefined;
}

/**
 * Labeled matrix of multi dimensional vectors.
 */
export interface IMatrix {
    [key: string]: IVector;
}

/**
 * Returns a promise that till provide the rate between the given dimensions possibly taking into account the original amount.
 */
export type getRate = (
    toDimension: string,
    fromDimension: string,
    originalAmount: number
) => Promise<number>;

/**
 * Returns the rate between the given dimensions possibly taking into account the original amount.
 */
export type getRateSync = (
    toDimension: string,
    fromDimension: string,
    originalAmount: number
) => number;

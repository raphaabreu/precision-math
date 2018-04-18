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
import { IVector } from "./Model/IVector";
import { Precision } from "./Model/Precision";
import { Rounding } from "./Model/Rounding";

/**
 * Adds all the given vectors.
 */
export function add(input: (IVector | IVector[])...): IVector {
    const response: IVector = Object.create(null);
    
    for (const vector of flatten(input)) {
        for (const dimension of dimensions(vector)) {
            if (response[dimension] === undefined) {
                response[dimension] = vector[dimension];
            } else {
                response[dimension] = response[dimension] + vector[dimension];
            }
        }
    }
    
    return response;
}

/**
 * Subtracts from the intial all the given vectors.
 */
export function subtract(initial: IVector, vectors: (IVector | IVector[])...): IVector {
    const response: IVector = {...initial};
    
    for (const vector of flatten(vectors)) {
        for (const dimension of dimensions(vector)) {
            if (response[dimension] === undefined) {
                response[dimension] = -vector[dimension];
            } else {
                response[dimension] = response[dimension] - vector[dimension];
            }
        }
    }
    
    return response;
}

/**
 * Multiplies the given vector by a scalar.
 */
export function multiply(vector: IVector, scalar: number): IVector {
    const response: IVector = {...initial};
    
    for (const dimension of dimensions(response)) {
        response[dimension] = response[dimension] * scalar;
    }
    
    return response;
}

/**
 * Divides the given vector by a scalar.
 */
export function divide(vector: IVector, scalar: number): IVector {
    const response: IVector = {...initial};
    
    for (const dimension of dimensions(response)) {
        response[dimension] = response[dimension] / scalar;
    }
    
    return response;
}

/**
 * Normalizes the given vector so that all values are between -1 and +1.
 */
export function normalize(vector: IVector): IVector {
    const response: IVector = {...initial};
    
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    
    for (const dimension of dimensions(response)) {
        if (response[dimension] < min) {
            min = response[dimension];
        }
        if (response[dimension] > max) {
            max = response[dimension];
        }
    }
    
    if (min > 0) {
        min = 0;
    }
    if (max < 0) {
        max = 0;
    }
    
    const scale = Math.max(max, Math.abs(min));
    
    for (const dimension of dimensions(response)) {
        response[dimension] = response[dimension] / scale;
    }
    
    return response;
}

/**
 * Normalizes the sum of all dimensions of the given vector between -1 and +1.
 */
export function normalizeSum(vector: IVector): IVector {
    const response: IVector = {...initial};
    
    let min = 0;
    let max = 0;
    
    for (const dimension of dimensions(response)) {
        if (response[dimension] < min) {
            min += response[dimension];
        }
        if (response[dimension] > 0) {
            max += response[dimension];
        }
    }
    
    if (min > 0) {
        min = 0;
    }
    if (max < 0) {
        max = 0;
    }
    
    const scale = Math.max(max, Math.abs(min));
    
    for (const dimension of dimensions(response)) {
        response[dimension] = response[dimension] / scale;
    }
    
    return response;
}

/**
 * Returns all the dimensions that the vector uses.
 */
export function dimensions(input: IVector): string[] {
    return Object.getOwnPropertyNames(input);
}

/**
 * Decomposes the given vector into an array of its components.
 */
export function decompose(input: IVector): IVector[] {
    const response: IVector[] = [];
    
    for (const dimension of dimensions(input)) {
        response.push({
            [dimension]: input[dimension]
        })
    }
    
    return response;
}

/**
 * Trims the vector removing zeroes and empty dimensions.
 */
export function trim(input: IVector): IVector {
    const response: IVector = {...initial};
    
    for (const dimension of dimensions(response)) {
        if (response[dimension] === 0 || response[dimension] === undefined || response[dimension] === null) {
            delete response[dimension];
        }
    }
    
    return response;
}

/**
 * Collapses all the dimensions of the given vector into a single one according with the conversion function.
 */
export function collapse(input: IVector, toDimension: string, getRate: Model.getRate): Promise<IVector> {
    const promises: Array<Promise<number>> = [];
    
    for (const dimension of dimensions(input)) {
        if (dimension === toDimension || input[dimension] === 0 || input[dimension] === undefined || input[dimension] === null) {
            continue;
        }
        
        promises.push(getRate(toDimension, dimension, input[dimension]).then(rate => input[dimension] * rate));
    }
    
    return Promise.all(promises).then(results => {
        return {
            [toDimension]: results.reduce((a,b) => a + b, undefined)
        }
    })
}

/**
 * Collapses all the dimensions of the given vector into a single one according with the conversion function in sync.
 */
export function collapseSync(input: IVector, toDimension: string, getRate: Model.getRateSync): IVector {
    let total;
    
    for (const dimension of dimensions(input)) {
        if (dimension === toDimension || input[dimension] === 0 || input[dimension] === undefined || input[dimension] === null) {
            continue;
        }
        if (total === undefined) {
            total = 0
        }
        
        total += input[dimension] * getRate(toDimension, dimension, input[dimension]);
    }
    
    return {
        [toDimension]: total
    };
}

/**
 * Flatten the input into a simple array.
 */
function flatten(input: Array<IVector | IVector[]>): IVector[] {
    const response: IVector[] = [];
    
    for (const element of input) {
        if (Array.isArray(element)) {
            response = response.concat(flatten(element));
        } else {
            response.push(element);
        }
    }
    
    return response;
}

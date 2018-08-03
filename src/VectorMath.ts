/*
 * Copyright (C) 2018 Atlas Project LLC
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

import { InvalidValueError } from "./Errors/InvalidValueError";
import {
  getRate,
  getRateSync,
  IDimensionValuePair,
  IVector
} from "./Model/IVector";
import { Precision } from "./Model/Precision";
import { Rounding } from "./Model/Rounding";
import { round } from "./PrecisionMath";

export class VectorMath {
  /**
   * Adds all the vectors in the given array.
   * When adding vectors, undefined is treated as zero.
   */
  public static add(vectors: IVector[]): IVector;

  /**
   * Adds both vectors given.
   * When adding vectors, undefined is treated as zero.
   */
  public static add(a: IVector, b: IVector): IVector;

  public static add(a: any, b?: any): IVector {
    const vectors = Array.isArray(a) ? a : [a, b];
    const response: IVector = Object.create(null);

    for (const vector of vectors) {
      for (const dimension of VectorMath.dimensions(vector)) {
        const newAmount = vector[dimension];
        if (newAmount === undefined) {
          continue;
        }
        response[dimension] = (response[dimension] || 0) + vector[dimension];
      }
    }

    return response;
  }

  /**
   * Subtracts from the intial all the given vectors.
   */
  public static subtract(a: IVector, b: IVector): IVector {
    const response: IVector = { ...a };

    for (const dimension of VectorMath.dimensions(b)) {
      const newAmount = b[dimension];
      if (newAmount === undefined) {
        continue;
      }
      response[dimension] = (response[dimension] || 0) - newAmount;
    }

    return response;
  }

  /**
   * Multiplies the given vector by a scalar or by another vector.
   */
  public static multiply(a: IVector, b: number | IVector): IVector {
    const response: IVector = { ...a };

    for (const dimension of VectorMath.dimensions(response)) {
      const currentAmount = a[dimension];
      const factor = typeof b === "number" ? b : b[dimension] || 1;

      if (currentAmount === 0 || currentAmount === undefined) {
        continue;
      }

      response[dimension] = currentAmount * factor;
    }

    return response;
  }

  /**
   * Divides the given vector by a scalar or by another vector.
   */
  public static divide(a: IVector, b: number | IVector): IVector {
    const response: IVector = { ...a };

    for (const dimension of VectorMath.dimensions(response)) {
      const currentAmount = a[dimension];
      const factor = typeof b === "number" ? b : b[dimension] || 1;

      if (currentAmount === 0 || currentAmount === undefined) {
        continue;
      }

      response[dimension] = currentAmount / factor;
    }

    return response;
  }

  /**
   * Normalizes the given vector so that all values are between -1 and +1.
   */
  public static normalize(vector: IVector): IVector {
    const response: IVector = { ...vector };

    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    for (const dimension of VectorMath.dimensions(response)) {
      const amount = vector[dimension];

      if (amount === 0 || amount === undefined) {
        continue;
      }

      if (amount < min) {
        min = amount;
      }
      if (amount > max) {
        max = amount;
      }
    }

    if (min > 0) {
      min = 0;
    }
    if (max < 0) {
      max = 0;
    }

    const scale = Math.max(max, Math.abs(min));

    for (const dimension of VectorMath.dimensions(response)) {
      const amount = vector[dimension];

      if (amount === 0 || amount === undefined) {
        continue;
      }

      response[dimension] = amount / scale;
    }

    return response;
  }

  /**
   * Normalizes by the sum of all dimensions of the given vector between -1 and +1.
   */
  public static normalizeSum(vector: IVector): IVector {
    const response: IVector = { ...vector };

    let min = 0;
    let max = 0;

    for (const dimension of VectorMath.dimensions(response)) {
      const amount = vector[dimension];

      if (amount === 0 || amount === undefined) {
        continue;
      }

      if (amount < 0) {
        min += amount;
      }
      if (amount > 0) {
        max += amount;
      }
    }

    if (min > 0) {
      min = 0;
    }
    if (max < 0) {
      max = 0;
    }

    const scale = Math.max(max, Math.abs(min));

    for (const dimension of VectorMath.dimensions(response)) {
      const amount = vector[dimension];

      if (amount === 0 || amount === undefined) {
        continue;
      }

      response[dimension] = amount / scale;
    }

    return response;
  }

  /**
   * Returns all the dimensions that the vector uses.
   */
  public static dimensions(vector: IVector): string[] {
    return Object.getOwnPropertyNames(vector);
  }

  /**
   * Decomposes the vector in an array of IDimensionValuePair.
   */
  public static values(vector: IVector): IDimensionValuePair[] {
    const response: IDimensionValuePair[] = [];

    for (const dimension of VectorMath.dimensions(vector)) {
      response.push({
        dimension,
        amount: vector[dimension]
      });
    }

    return response;
  }

  /**
   * Asserts that the given vector is single dimension and return its value.
   */
  public static assertSingleDimension(vector: IVector): IDimensionValuePair {
    const values = VectorMath.values(vector);

    if (values.length !== 1) {
      throw new InvalidValueError(
        "Single dimension vector expected: " + JSON.stringify(vector)
      );
    }

    return values[0];
  }

  /**
   * Decomposes the given vector into an array of its components.
   */
  public static decompose(vector: IVector): IVector[] {
    const response: IVector[] = [];

    for (const dimension of VectorMath.dimensions(vector)) {
      response.push({
        [dimension]: vector[dimension]
      });
    }

    return response;
  }

  /**
   * Trims the vector removing zeroes and empty dimensions.
   */
  public static trim(vector: IVector): IVector {
    const response: IVector = { ...vector };

    for (const dimension of VectorMath.dimensions(response)) {
      if (response[dimension] === 0 || response[dimension] === undefined) {
        delete response[dimension];
      }
    }

    return response;
  }

  /**
   * Collapses all the dimensions of the given vector into a single one according with the conversion function.
   */
  public static collapse(
    vector: IVector,
    toDimension: string,
    fetchRateFn: getRate
  ): Promise<IVector> {
    const values = VectorMath.values(vector);

    if (values.find(value => value.amount === undefined)) {
      return Promise.resolve({ [toDimension]: undefined });
    }

    const promises: Array<Promise<number>> = [];

    for (const value of values) {
      const amount = value.amount;
      if (amount === undefined) {
        continue;
      }
      if (value.dimension === toDimension || amount === 0) {
        promises.push(Promise.resolve(amount));
        continue;
      }

      promises.push(
        fetchRateFn(toDimension, value.dimension, amount).then(
          rate => amount * rate
        )
      );
    }

    if (promises.length === 0) {
      return Promise.resolve({ [toDimension]: undefined });
    }

    return Promise.all(promises).then(results => {
      return {
        [toDimension]: results.reduce((a, b) => a + b, 0)
      };
    });
  }

  /**
   * Collapses all the dimensions of the given vector into a single one according with the conversion function in sync.
   */
  public static collapseSync(
    vector: IVector,
    toDimension: string,
    fetchRateFn: getRateSync
  ): IVector {
    const values = VectorMath.values(vector);

    if (values.find(value => value.amount === undefined)) {
      return { [toDimension]: undefined };
    }

    let total: number | undefined;

    for (const value of values) {
      const amount = value.amount;
      if (amount === undefined) {
        continue;
      }
      if (value.dimension === toDimension || amount === 0) {
        total = (total || 0) + amount;
        continue;
      }

      total =
        (total || 0) +
        amount * fetchRateFn(toDimension, value.dimension, amount);
    }

    return { [toDimension]: total };
  }

  /**
   * Rounds the vector given using the desired precision.
   */
  public static round(
    value: IVector,
    precision: Precision,
    rounding: Rounding = Rounding.Nearest
  ): IVector {
    const response: IVector = { ...value };

    for (const dimension of VectorMath.dimensions(response)) {
      const currentAmount = value[dimension];
      if (currentAmount === undefined) {
        continue;
      }

      response[dimension] = round(currentAmount, precision, rounding);
    }

    return response;
  }
}

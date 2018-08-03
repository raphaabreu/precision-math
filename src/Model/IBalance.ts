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

import { IConvertible } from "./IConvertible";
import { IValue } from "./IValue";
import { Precision } from "./Precision";

/**
 * Symbol-number value map.
 */
export interface IValueMap {
  [symbol: string]: number;
}

/**
 * Interface that describes amounts on multiple symbols using a specific
 * precision.
 */
export interface IBalance extends IConvertible {
  /**
   * Map of values present on this IBalance.
   */
  readonly values: IValueMap;

  /**
   * Array of symbols present on this IBalance.
   */
  readonly symbols: string[];

  /**
   * Precision to be used for calculations.
   */
  readonly precision: Precision;

  /**
   * Returns the amount registered against the given symbol or returns
   * undefined if the symbol is not present.
   */
  get(symbol: string): number;

  /**
   * Set the amount for the given symbol and return a new instance.
   */
  set(symbol: string, amount: number): IBalance;

  /**
   * Removes the given symbol and return a new instance.
   */
  remove(symbol: string): IBalance;

  /**
   * Returns true if the given symbol is present on the IBalance.
   */
  has(symbol: string): boolean;

  /**
   * Returns an instance of IValue representing the amount registered for the
   * given symbol on the IBalance or returns undefined if the symbol is not
   * present.
   */
  getValue(symbol: string): IValue | undefined;

  /**
   * Returns an Array of IValues representing all the symbols present on the
   * IBalance.
   */
  toValueArray(): IValue[];

  /**
   * Modifies the IBalance using the provided callback and return the new
   * insance.
   */
  modify(
    fn: (
      value: number,
      symbol?: string,
      precision?: Precision,
      originalBalance?: IBalance
    ) => number
  ): IBalance;

  /**
   * Calculates the positive amounts of all symbols and return the new
   * instance.
   */
  abs(): IBalance;

  /**
   * Returns true if the IBalance has any symbols with zero amounts.
   */
  isZero(): boolean;

  /**
   * Removes all zero-amount symbols and return the new instance.
   */
  removeZeroes(): IBalance;

  /**
   * Adds the given values and return the new instance.
   */
  add(
    value: IBalance | IValueMap | IValue | IBalance[] | IValueMap[] | IValue[]
  ): IBalance;

  /**
   * Subtracts the given values and return the new instance.
   */
  subtract(
    value: IBalance | IValueMap | IValue | IBalance[] | IValueMap[] | IValue[]
  ): IBalance;

  /**
   * Multiplies the IBalance by the provided factors and return the new
   * instance.
   */
  multiply(...factors: number[]): IBalance;

  /**
   * Divides the IBalance by the provided factors and return the new instance.
   */
  divide(...factors: number[]): IBalance;

  /**
   * Rounds the amounts to the given precision and return a new instance.
   */
  round(precision: Precision): IBalance;

  /**
   * Returns the string representation of the IBalance.
   */
  toString(): string;
}

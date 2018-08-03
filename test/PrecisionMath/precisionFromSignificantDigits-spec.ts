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

import test from "ava";
import { Precision, precisionFromSignificantDigits } from "../../src/index";

test("Should calculate the precision from the given amount and number of significant digits", t => {
  t.is(precisionFromSignificantDigits(100, 1), 1);
  t.is(precisionFromSignificantDigits(100, 2), 1);
  t.is(precisionFromSignificantDigits(100, 3), 1);
  t.is(precisionFromSignificantDigits(100, 4), 0.1);
  t.is(precisionFromSignificantDigits(100, 5), 0.01);
  t.is(precisionFromSignificantDigits(100, 6), 0.001);
  t.is(precisionFromSignificantDigits(100, 7), 0.0001);
  t.is(precisionFromSignificantDigits(12.3, 7), 0.00001);
  t.is(precisionFromSignificantDigits(1.23, 7), 0.000001);
  t.is(precisionFromSignificantDigits(0.123, 7), 0.0000001);
  t.is(precisionFromSignificantDigits(0.0123, 7), 0.00000001);

  t.is(precisionFromSignificantDigits(-100, 1), 1);
  t.is(precisionFromSignificantDigits(-100, 2), 1);
  t.is(precisionFromSignificantDigits(-100, 3), 1);
  t.is(precisionFromSignificantDigits(-100, 4), 0.1);
  t.is(precisionFromSignificantDigits(-100, 5), 0.01);
  t.is(precisionFromSignificantDigits(-100, 6), 0.001);
  t.is(precisionFromSignificantDigits(-100, 7), 0.0001);
  t.is(precisionFromSignificantDigits(-12.3, 7), 0.00001);
  t.is(precisionFromSignificantDigits(-1.23, 7), 0.000001);
  t.is(precisionFromSignificantDigits(-0.123, 7), 0.0000001);
  t.is(precisionFromSignificantDigits(-0.0123, 7), 0.00000001);
});

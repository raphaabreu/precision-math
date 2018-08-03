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
import {
  InvalidPrecisionError,
  Precision,
  precisionDivisor
} from "../../src/index";

test("Should calculate the number of fraction digits of a given precision", t => {
  t.is(precisionDivisor(Precision.Integer), 1);
  t.is(precisionDivisor(Precision.Tenth), 10);
  t.is(precisionDivisor(Precision.Hundredth), 100);
  t.is(precisionDivisor(Precision.Thousandth), 1000);
  t.is(precisionDivisor(Precision.TenThousandth), 10000);
  t.is(precisionDivisor(Precision.HundredThousandth), 100000);
  t.is(precisionDivisor(Precision.Millionth), 1000000);
  t.is(precisionDivisor(Precision.TenMillionth), 10000000);
  t.is(precisionDivisor(Precision.HundredMillionth), 100000000);
  t.is(precisionDivisor(Precision.Billionth), 1000000000);
  t.is(precisionDivisor(Precision.TenBillionth), 10000000000);
  t.is(precisionDivisor(Precision.HundredBillionth), 100000000000);
});

test("Should throw if trying to calculate the number of fraction digits with an invalid precision", t => {
  const error = t.throws(() => precisionDivisor(1.1));

  t.true(error instanceof InvalidPrecisionError);
});

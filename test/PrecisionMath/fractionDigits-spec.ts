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
  fractionDigits,
  InvalidPrecisionError,
  Precision
} from "../../src/index";

test("Should calculate the number of fraction digits of a given precision", t => {
  t.is(fractionDigits(Precision.Integer), 0);
  t.is(fractionDigits(Precision.Tenth), 1);
  t.is(fractionDigits(Precision.Hundredth), 2);
  t.is(fractionDigits(Precision.Thousandth), 3);
  t.is(fractionDigits(Precision.TenThousandth), 4);
  t.is(fractionDigits(Precision.HundredThousandth), 5);
  t.is(fractionDigits(Precision.Millionth), 6);
  t.is(fractionDigits(Precision.TenMillionth), 7);
  t.is(fractionDigits(Precision.HundredMillionth), 8);
  t.is(fractionDigits(Precision.Billionth), 9);
  t.is(fractionDigits(Precision.TenBillionth), 10);
  t.is(fractionDigits(Precision.HundredBillionth), 11);
});

test("Should throw if trying to calculate the number of fraction digits with an invalid precision", t => {
  const error = t.throws(() => fractionDigits(1.1));

  t.true(error instanceof InvalidPrecisionError);
});

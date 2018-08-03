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
import { Precision, toInt, UnsafeCalculationError } from "../../src/index";

test("Should convert the number to the equivalent integer using the supplied precision", t => {
  t.is(toInt(Math.PI, Precision.Integer), 3);
  t.is(toInt(Math.PI, Precision.Tenth), 31);
  t.is(toInt(Math.PI, Precision.Hundredth), 314);
  t.is(toInt(Math.PI, Precision.Thousandth), 3142);
  t.is(toInt(Math.PI, Precision.TenThousandth), 31416);
  t.is(toInt(Math.PI, Precision.HundredThousandth), 314159);
  t.is(toInt(Math.PI, Precision.Millionth), 3141593);
  t.is(toInt(Math.PI, Precision.TenMillionth), 31415927);
  t.is(toInt(Math.PI, Precision.HundredMillionth), 314159265);
  t.is(toInt(Math.PI, Precision.Billionth), 3141592654);
  t.is(toInt(Math.PI, Precision.TenBillionth), 31415926536);
  t.is(toInt(Math.PI, Precision.HundredBillionth), 314159265359);

  t.is(toInt(-Math.PI, Precision.Integer), -3);
  t.is(toInt(-Math.PI, Precision.Tenth), -31);
  t.is(toInt(-Math.PI, Precision.Hundredth), -314);
  t.is(toInt(-Math.PI, Precision.Thousandth), -3142);
  t.is(toInt(-Math.PI, Precision.TenThousandth), -31416);
  t.is(toInt(-Math.PI, Precision.HundredThousandth), -314159);
  t.is(toInt(-Math.PI, Precision.Millionth), -3141593);
  t.is(toInt(-Math.PI, Precision.TenMillionth), -31415927);
  t.is(toInt(-Math.PI, Precision.HundredMillionth), -314159265);
  t.is(toInt(-Math.PI, Precision.Billionth), -3141592654);
  t.is(toInt(-Math.PI, Precision.TenBillionth), -31415926536);
  t.is(toInt(-Math.PI, Precision.HundredBillionth), -314159265359);
});

test("Should throw if trying to convert a positive unsafe float to integer", t => {
  const error = t.throws(() => toInt(0.9007299254740991, 0.0000000000000001));

  t.true(error instanceof UnsafeCalculationError);
});

test("Should throw if trying to convert a negative unsafe float to integer", t => {
  const error = t.throws(() => toInt(-0.9007299254740991, 0.0000000000000001));

  t.true(error instanceof UnsafeCalculationError);
});

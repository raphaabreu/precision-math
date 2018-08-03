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
import { Precision, toFloat, UnsafeCalculationError } from "../../src/index";

test("Should convert the number to the equivalent integer using the supplied precision", t => {
  t.is(toFloat(3, Precision.Integer), 3);
  t.is(toFloat(31, Precision.Tenth), 3.1);
  t.is(toFloat(314, Precision.Hundredth), 3.14);
  t.is(toFloat(3142, Precision.Thousandth), 3.142);
  t.is(toFloat(31416, Precision.TenThousandth), 3.1416);
  t.is(toFloat(314159, Precision.HundredThousandth), 3.14159);
  t.is(toFloat(3141593, Precision.Millionth), 3.141593);
  t.is(toFloat(31415927, Precision.TenMillionth), 3.1415927);
  t.is(toFloat(314159265, Precision.HundredMillionth), 3.14159265);
  t.is(toFloat(3141592654, Precision.Billionth), 3.141592654);
  t.is(toFloat(31415926536, Precision.TenBillionth), 3.1415926536);
  t.is(toFloat(314159265359, Precision.HundredBillionth), 3.14159265359);

  t.is(toFloat(-3, Precision.Integer), -3);
  t.is(toFloat(-31, Precision.Tenth), -3.1);
  t.is(toFloat(-314, Precision.Hundredth), -3.14);
  t.is(toFloat(-3142, Precision.Thousandth), -3.142);
  t.is(toFloat(-31416, Precision.TenThousandth), -3.1416);
  t.is(toFloat(-314159, Precision.HundredThousandth), -3.14159);
  t.is(toFloat(-3141593, Precision.Millionth), -3.141593);
  t.is(toFloat(-31415927, Precision.TenMillionth), -3.1415927);
  t.is(toFloat(-314159265, Precision.HundredMillionth), -3.14159265);
  t.is(toFloat(-3141592654, Precision.Billionth), -3.141592654);
  t.is(toFloat(-31415926536, Precision.TenBillionth), -3.1415926536);
  t.is(toFloat(-314159265359, Precision.HundredBillionth), -3.14159265359);
});

test("Should throw if trying to convert a positive unsafe integer to float", t => {
  const error = t.throws(() =>
    toFloat(9007299254740991, Precision.HundredMillionth)
  );

  t.true(error instanceof UnsafeCalculationError);
});

test("Should throw if trying to convert a negative unsafe integer to float", t => {
  const error = t.throws(() =>
    toFloat(-9007299254740991, Precision.HundredMillionth)
  );

  t.true(error instanceof UnsafeCalculationError);
});

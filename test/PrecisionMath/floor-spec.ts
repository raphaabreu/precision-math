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
import { floor, Precision } from "../../src/index";

test("Should floor numbers to desired precision", t => {
  // Positive integers
  t.is(floor(123.456, Precision.Integer), 123);
  t.is(floor(123.789, Precision.Integer), 123);

  // Negative integers
  t.is(floor(-123.456, Precision.Integer), -124);
  t.is(floor(-123.789, Precision.Integer), -124);

  // Zero
  t.is(floor(0, Precision.Integer), 0);
  t.is(floor(-0, Precision.Integer), -0);

  // Positive decimals
  t.is(floor(0.00999, Precision.Hundredth), 0);
  t.is(floor(0.01222, Precision.Hundredth), 0.01);

  // Negative decimals
  t.is(floor(-0.00127819, Precision.TenThousandth), -0.0013);
  t.is(floor(-0.00123456, Precision.TenThousandth), -0.0013);
});

test("Should return same number if flooring to higher precision", t => {
  // Positive integers
  t.is(floor(123, Precision.Integer), 123);
  t.is(floor(123, Precision.Hundredth), 123);

  // Negative integers
  t.is(floor(-123, Precision.Integer), -123);
  t.is(floor(-123, Precision.Hundredth), -123);

  // Zero
  t.is(floor(0, Precision.Hundredth), 0);
  t.is(floor(-0, Precision.Hundredth), -0);

  // Positive decimals
  t.is(floor(0.00999, Precision.Billionth), 0.00999);
  t.is(floor(0.01222, Precision.Billionth), 0.01222);

  // Negative decimals
  t.is(floor(-0.00127819, Precision.HundredBillionth), -0.00127819);
  t.is(floor(-0.00123456, Precision.HundredBillionth), -0.00123456);
});

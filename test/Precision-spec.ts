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
import { Precision } from "../src/index";

/*
 ===============================================================================
 Consts
 ===============================================================================
 */

test("Should have the correct precision values", t => {
  t.is(Precision.Integer, 1);
  t.is(Precision.Tenth, 0.1);
  t.is(Precision.Hundredth, 0.01);
  t.is(Precision.Cent, 0.01);
  t.is(Precision.Thousandth, 0.001);
  t.is(Precision.Millie, 0.001);
  t.is(Precision.TenThousandth, 0.0001);
  t.is(Precision.HundredThousandth, 0.00001);
  t.is(Precision.Millionth, 0.000001);
  t.is(Precision.Bit, 0.000001);
  t.is(Precision.TenMillionth, 0.0000001);
  t.is(Precision.HundredMillionth, 0.00000001);
  t.is(Precision.Satoshi, 0.00000001);
  t.is(Precision.Billionth, 0.000000001);
  t.is(Precision.TenBillionth, 0.0000000001);
  t.is(Precision.SatoshiCent, 0.0000000001);
  t.is(Precision.HundredBillionth, 0.00000000001);
});

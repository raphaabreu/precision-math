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
import { Precision, subtract } from "../../src/index";

test("Should subtract numbers to desired precision", t => {
  t.is(subtract(0.3, 0.1, Precision.Hundredth), 0.2);
  t.is(subtract(0.3, 0.6, Precision.Hundredth), -0.3);

  t.is(subtract(Math.E, Math.PI, Precision.Integer), -0);
  t.is(subtract(Math.E, Math.PI, Precision.Tenth), -0.4);
  t.is(subtract(Math.E, Math.PI, Precision.Hundredth), -0.42);
  t.is(subtract(Math.E, Math.PI, Precision.Thousandth), -0.423);
  t.is(subtract(Math.E, Math.PI, Precision.TenThousandth), -0.4233);
  t.is(subtract(Math.E, Math.PI, Precision.HundredThousandth), -0.42331);
  t.is(subtract(Math.E, Math.PI, Precision.Millionth), -0.423311);
  t.is(subtract(Math.E, Math.PI, Precision.TenMillionth), -0.4233108);
  t.is(subtract(Math.E, Math.PI, Precision.HundredMillionth), -0.42331083);
  t.is(subtract(Math.E, Math.PI, Precision.Billionth), -0.423310825);
  t.is(subtract(Math.E, Math.PI, Precision.TenBillionth), -0.4233108251);
  t.is(subtract(Math.E, Math.PI, Precision.HundredBillionth), -0.42331082513);
});

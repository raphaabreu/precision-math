/*
 * Copyright (C) 2018 Raphael Lorenzeto de Abreu <raphael.lorenzeto@gmail.com>
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
import { multiply, Precision, Rounding } from "../../src/index";

test("Should multiply numbers to desired precision", t => {
    t.is(multiply(Math.E, Math.PI, Precision.Integer), 9);
    t.is(multiply(Math.E, Math.PI, Precision.Tenth), 8.5);
    t.is(multiply(Math.E, Math.PI, Precision.Hundredth), 8.54);
    t.is(multiply(Math.E, Math.PI, Precision.Thousandth), 8.54);
    t.is(multiply(Math.E, Math.PI, Precision.TenThousandth), 8.5397);
    t.is(multiply(Math.E, Math.PI, Precision.HundredThousandth), 8.53973);
    t.is(multiply(Math.E, Math.PI, Precision.Millionth), 8.539734);
    t.is(multiply(Math.E, Math.PI, Precision.TenMillionth), 8.5397342);
    t.is(multiply(Math.E, Math.PI, Precision.HundredMillionth), 8.53973422);
    t.is(multiply(Math.E, Math.PI, Precision.Billionth), 8.539734223);
    t.is(multiply(Math.E, Math.PI, Precision.TenBillionth), 8.5397342227);
    t.is(multiply(Math.E, Math.PI, Precision.HundredBillionth), 8.53973422267);
});

test("Should multiply numbers to desired precision using custom rounding", t => {
    t.is(multiply(2002, 0.001, Precision.TenThousandth, Rounding.Up), 2.002);
});

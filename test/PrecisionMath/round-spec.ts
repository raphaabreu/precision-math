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

import { Precision, round, Rounding } from "../../src/index";

test("Should round numbers to desired precision", t => {
    // Positive integers
    t.is(round(123.456, Precision.Integer), 123);
    t.is(round(123.789, Precision.Integer), 124);

    // Negative integers
    t.is(round(-123.456, Precision.Integer), -123);
    t.is(round(-123.789, Precision.Integer), -124);

    // Zero
    t.is(round(0, Precision.Integer), 0);
    t.is(round(-0, Precision.Integer), -0);

    // Positive decimals
    t.is(round(0.00999, Precision.Hundredth), 0.01);
    t.is(round(0.01222, Precision.Hundredth), 0.01);
    t.is(round(0.1 + 0.2, Precision.Hundredth), 0.3);

    // Negative decimals
    t.is(round(-0.00127819, Precision.TenThousandth), -0.0013);
    t.is(round(-0.00123456, Precision.TenThousandth), -0.0012);
    t.is(round(0.3 - 0.2, Precision.Hundredth), 0.1);
});

test("Should return same number if rounding to higher precision", t => {
    // Positive integers
    t.is(round(123, Precision.Integer), 123);
    t.is(round(123, Precision.Hundredth), 123);

    // Negative integers
    t.is(round(-123, Precision.Integer), -123);
    t.is(round(-123, Precision.Hundredth), -123);

    // Zero
    t.is(round(0, Precision.Hundredth), 0);
    t.is(round(-0, Precision.Hundredth), -0);

    // Positive decimals
    t.is(round(0.00999, Precision.Billionth), 0.00999);
    t.is(round(0.01222, Precision.Billionth), 0.01222);

    // Negative decimals
    t.is(round(-0.00127819, Precision.HundredBillionth), -0.00127819);
    t.is(round(-0.00123456, Precision.HundredBillionth), -0.00123456);
});

test("Should round numbers to desired precision using custom rounding strategy", t => {
    t.is(round(0.1 + 0.2, Precision.Hundredth, Rounding.Nearest), 0.3);
    t.is(round(0.1 + 0.2, Precision.Hundredth, Rounding.Floor), 0.3);
    t.is(round(0.1 + 0.2, Precision.Hundredth, Rounding.Ceil), 0.3);
    t.is(round(0.1 + 0.2, Precision.Hundredth, Rounding.Up), 0.3);
    t.is(round(0.1 + 0.2, Precision.Hundredth, Rounding.Down), 0.3);
});

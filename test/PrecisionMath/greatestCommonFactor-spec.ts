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
import {
    greatestCommonFactor,
    InvalidValueError,
    Precision
} from "../../src/index";

test("Should calculate the greatest common factor of two values using the desired precision", t => {
    t.is(greatestCommonFactor(0, 0, Precision.Integer), 0);
    t.is(greatestCommonFactor(0, 1, Precision.Integer), 1);
    t.is(greatestCommonFactor(1, 0, Precision.Integer), 1);

    t.is(greatestCommonFactor(1, 1, Precision.Integer), 1);
    t.is(greatestCommonFactor(1, 2, Precision.Integer), 1);

    t.is(greatestCommonFactor(2, 2, Precision.Integer), 2);
    t.is(greatestCommonFactor(123, 123, Precision.Integer), 123);

    t.is(greatestCommonFactor(18, 24, Precision.Integer), 6);
    t.is(greatestCommonFactor(24, 18, Precision.Integer), 6);
    t.is(greatestCommonFactor(14, 49, Precision.Integer), 7);
    t.is(greatestCommonFactor(49, 14, Precision.Integer), 7);
    t.is(greatestCommonFactor(15, 75, Precision.Integer), 15);
    t.is(greatestCommonFactor(75, 15, Precision.Integer), 15);

    t.is(greatestCommonFactor(0.18, 0.24, Precision.Hundredth), 0.06);
    t.is(greatestCommonFactor(0.15, 0.75, Precision.Hundredth), 0.15);
    t.is(greatestCommonFactor(0.024, 0.018, Precision.Thousandth), 0.006);
    t.is(greatestCommonFactor(0.0014, 0.0049, Precision.TenThousandth), 0.0007);

    t.is(greatestCommonFactor(0.01, 0.02, Precision.Hundredth), 0.01);
    t.is(
        greatestCommonFactor(0.0001, 0.0001, Precision.HundredThousandth),
        0.0001
    );
});

test("Should throw if trying to calculate the greatest common factor of negative numbers", t => {
    const error = t.throws(() =>
        greatestCommonFactor(-5, 9, Precision.Integer)
    );

    t.true(error instanceof InvalidValueError);
    t.is(error.message, "Not possible to calculate GCF of negative numbers");
});

test("Should throw if trying to calculate the greatest common factor of negative numbers", t => {
    const error = t.throws(() =>
        greatestCommonFactor(5, -9, Precision.Integer)
    );

    t.true(error instanceof InvalidValueError);
    t.is(error.message, "Not possible to calculate GCF of negative numbers");
});

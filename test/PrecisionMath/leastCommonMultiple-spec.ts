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
    InvalidValueError,
    leastCommonMultiple,
    Precision
} from "../../src/index";

test("Should calculate the least common multiple of two values using the desired precision", t => {
    t.is(leastCommonMultiple(0, 0, Precision.Integer), Number.NaN);

    t.is(leastCommonMultiple(0, 1, Precision.Integer), 0);
    t.is(leastCommonMultiple(1, 0, Precision.Integer), 0);
    t.is(leastCommonMultiple(1, 1, Precision.Integer), 1);

    t.is(leastCommonMultiple(3, 4, Precision.Integer), 12);
    t.is(leastCommonMultiple(4, 3, Precision.Integer), 12);

    t.is(leastCommonMultiple(12, 80, Precision.Integer), 240);
    t.is(leastCommonMultiple(25, 60, Precision.Integer), 300);

    t.is(leastCommonMultiple(0.04, 0.1, Precision.Hundredth), 0.2);
    t.is(leastCommonMultiple(0.0001, 0.0025, Precision.TenThousandth), 0.0025);
    t.is(leastCommonMultiple(0.0125, 0.006, Precision.TenThousandth), 0.15);
});

test("Should throw if trying to calculate the least common multiple of negative numbers", t => {
    const error = t.throws(() => leastCommonMultiple(-5, 9, Precision.Integer));

    t.true(error instanceof InvalidValueError);
    t.is(error.message, "Not possible to calculate LCM of negative numbers");
});

test("Should throw if trying to calculate the least common multiple of negative numbers", t => {
    const error = t.throws(() => leastCommonMultiple(5, -9, Precision.Integer));

    t.true(error instanceof InvalidValueError);
    t.is(error.message, "Not possible to calculate LCM of negative numbers");
});

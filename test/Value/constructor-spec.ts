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
import { Precision, Value } from "../../src/index";

test("Should instantiate a new value", t => {
    const v = new Value(100, "BTC", Precision.Thousandth);

    t.is(v.symbol, "BTC");
    t.is(v.amount, 100);
    t.is(v.precision, Precision.Thousandth);
});

test("Should round the amount when instantiating a new value", t => {
    const v = new Value(Math.PI, "BTC", Precision.Thousandth);

    t.is(v.symbol, "BTC");
    t.is(v.amount, 3.142);
    t.is(v.precision, Precision.Thousandth);
});

test("Should throw if trying to instantiate without a symbol", t => {
    const error = t.throws(() => new Value(100, "", Precision.Thousandth));

    t.is(error.message, "Symbol is required.");
});

test("Should throw if trying to instantiate without a number", t => {
    const error = t.throws(
        () => new Value(Number.NaN, "BTC", Precision.Thousandth)
    );

    t.is(error.message, "Amount is not a number.");
});

test("Should throw if trying to instantiate with a non-numeric precision", t => {
    const error = t.throws(() => new Value(100, "BTC", Number.NaN));

    t.is(error.message, "Precision is not a number.");
});

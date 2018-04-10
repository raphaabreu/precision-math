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
import { Balance, Precision, Value } from "../../src/index";

test("Should instantiate an empty balance with its precision", t => {
    const balances = [
        new Balance(Precision.Thousandth),
        new Balance({}, Precision.Thousandth),
        new Balance(undefined as any, Precision.Thousandth),
        new Balance(null as any, Precision.Thousandth)
    ];

    t.plan(8);

    for (const balance of balances) {
        t.deepEqual(balance.values, {});
        t.is(balance.precision, Precision.Thousandth);
    }
});

test("Should instantiate with a single value", t => {
    const initial = new Balance(new Value(100, "BTC", Precision.Thousandth));

    t.deepEqual(initial.values, { BTC: 100 });
    t.is(initial.precision, Precision.Thousandth);
});

test("Should instantiate with a single value and a custom lower precision", t => {
    const initial = new Balance(
        new Value(100, "BTC", Precision.Thousandth),
        Precision.Tenth
    );

    t.deepEqual(initial.values, { BTC: 100 });
    t.is(initial.precision, Precision.Thousandth);
});

test("Should instantiate with a single value and a custom higher precision", t => {
    const initial = new Balance(
        new Value(100, "BTC", Precision.Thousandth),
        Precision.Millionth
    );

    t.deepEqual(initial.values, { BTC: 100 });
    t.is(initial.precision, Precision.Millionth);
});

test("Should instantiate with a value array", t => {
    const initial = new Balance([
        new Value(100, "BTC", Precision.Thousandth),
        new Value(200, "LTC", Precision.Millionth),
        new Value(300, "ETH", Precision.Tenth)
    ]);

    t.deepEqual(initial.values, { BTC: 100, LTC: 200, ETH: 300 });
    t.is(initial.precision, Precision.Millionth);
});

test("Should instantiate with a value array and a custom lower precision", t => {
    const initial = new Balance(
        [
            new Value(100, "BTC", Precision.Thousandth),
            new Value(200, "LTC", Precision.Millionth),
            new Value(300, "ETH", Precision.Tenth)
        ],
        Precision.Integer
    );

    t.deepEqual(initial.values, { BTC: 100, LTC: 200, ETH: 300 });
    t.is(initial.precision, Precision.Millionth);
});

test("Should instantiate with a value array and a custom higher precision", t => {
    const initial = new Balance(
        [
            new Value(100, "BTC", Precision.Thousandth),
            new Value(200, "LTC", Precision.Millionth),
            new Value(300, "ETH", Precision.Tenth)
        ],
        Precision.Billionth
    );

    t.deepEqual(initial.values, { BTC: 100, LTC: 200, ETH: 300 });
    t.is(initial.precision, Precision.Billionth);
});

test("Should instantiate with another balance", t => {
    const initial = new Balance(
        { BTC: 100, LTC: 200, ETH: 300 },
        Precision.Hundredth
    );
    const final = new Balance(initial);

    t.deepEqual(final.values, { BTC: 100, LTC: 200, ETH: 300 });
    t.is(final.precision, Precision.Hundredth);
});

test("Should instantiate with another balance and a higher precision", t => {
    const initial = new Balance(
        { BTC: 100, LTC: 200, ETH: 300 },
        Precision.Hundredth
    );
    const final = new Balance(initial, Precision.Thousandth);

    t.deepEqual(final.values, { BTC: 100, LTC: 200, ETH: 300 });
    t.is(final.precision, Precision.Thousandth);
});

test("Should instantiate with another balance and a lower precision", t => {
    const initial = new Balance(
        { BTC: 100.0005, LTC: 200.009, ETH: 300.002 },
        Precision.Hundredth
    );
    const final = new Balance(initial, Precision.Tenth);

    t.deepEqual(final.values, { BTC: 100, LTC: 200.01, ETH: 300 });
    t.is(final.precision, Precision.Hundredth);
});

test("Should instantiate with a value map", t => {
    const initial = new Balance(
        { BTC: 42.005, LTC: 11.09, ETH: 87.02 },
        Precision.Tenth
    );

    t.deepEqual(initial.values, { BTC: 42, LTC: 11.1, ETH: 87 });
    t.is(initial.precision, Precision.Tenth);
});

test("Should throw if trying to instantiate with repeated symbols", t => {
    const error = t.throws(
        () =>
            new Balance([
                new Value(100, "LTC", Precision.Thousandth),
                new Value(200, "LTC", Precision.Thousandth)
            ])
    );

    t.is(error.message, "Operation invalid due to repeated symbols: LTC");
});

test("Should throw if trying to instantiate with an object that has non-numeric properties", t => {
    const error = t.throws(
        () => new Balance({ foo: "bar" } as any, Precision.Thousandth)
    );

    t.is(error.message, "Cannot convert obj['foo'] = 'string' to Value.");
});

test("Should throw if trying to instantiate with an invalid argument", t => {
    const error = t.throws(
        () => new Balance("test" as any, Precision.Thousandth)
    );

    t.is(error.message, "Cannot convert 'string' to Value: test.");
});

test("Should throw if trying to instantiate with a value that cannot be represented on the given precision", t => {
    process.env.STRICT_PRECISION = "true";

    const error = t.throws(() => new Balance({ BTC: 1.00001 }, Precision.Cent));

    process.env.STRICT_PRECISION = undefined;

    t.is(
        error.message,
        "The amount 1.00001 cannot be represented using the precision 0.01 without loss of information."
    );
});

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

test("Should create a new instance from adding an array of balances", t => {
    const final = Balance.add([
        new Balance({ BTC: 12.34 }, Precision.Hundredth),
        new Balance({ BTC: 65.432, XMR: 1.1298 }, Precision.Thousandth)
    ]);

    t.deepEqual(
        final,
        new Balance({ BTC: 77.772, XMR: 1.13 }, Precision.Thousandth)
    );
});

test("Should create a new instance from adding an array of value objects", t => {
    const final = Balance.add([
        new Value(56.789, "BTC", Precision.Thousandth),
        new Value(-45.6, "LTC", Precision.Tenth)
    ]);

    t.deepEqual(
        final,
        new Balance({ BTC: 56.789, LTC: -45.6 }, Precision.Thousandth)
    );
});

test("Should add one balance", t => {
    const initial = new Balance({ BTC: 12.34 }, Precision.Hundredth);
    const final = initial.add(
        new Balance({ BTC: 65.432, XMR: 1.1298 }, Precision.Thousandth)
    );

    t.deepEqual(initial.values, { BTC: 12.34 });
    t.deepEqual(
        final,
        new Balance({ BTC: 77.772, XMR: 1.13 }, Precision.Thousandth)
    );
});

test("Should add an array of balances", t => {
    const initial = new Balance({ BTC: 12.34 }, Precision.Hundredth);
    const final = initial.add([
        new Balance({ BTC: 56.789 }, Precision.HundredThousandth),
        new Balance({ LTC: -45.6, XMR: 1.229 }, Precision.Thousandth)
    ]);

    t.deepEqual(initial.values, { BTC: 12.34 });
    t.deepEqual(
        final,
        new Balance(
            { BTC: 69.129, LTC: -45.6, XMR: 1.229 },
            Precision.HundredThousandth
        )
    );
});

test("Should add one value object", t => {
    const initial = new Balance({ BTC: 12.34 }, Precision.Hundredth);
    const final = initial.add(new Value(65.432, "BTC", Precision.Thousandth));

    t.deepEqual(initial.values, { BTC: 12.34 });
    t.deepEqual(final, new Balance({ BTC: 77.772 }, Precision.Thousandth));
});

test("Should add an array of value objects", t => {
    const initial = new Balance({ BTC: 12.34 }, Precision.Hundredth);
    const final = initial.add([
        new Value(56.789, "BTC", Precision.Thousandth),
        new Value(-45.6, "LTC", Precision.Tenth)
    ]);

    t.deepEqual(initial.values, { BTC: 12.34 });
    t.deepEqual(
        final,
        new Balance({ BTC: 69.129, LTC: -45.6 }, Precision.Thousandth)
    );
});

test("Should add one value map", t => {
    const initial = new Balance({ BTC: 12.34 }, Precision.Hundredth);
    const final = initial.add({ BTC: 65.432, XMR: 1.1298 });

    t.deepEqual(initial.values, { BTC: 12.34 });
    t.deepEqual(
        final,
        new Balance({ BTC: 77.77, XMR: 1.13 }, Precision.Hundredth)
    );
});

test("Should add an array of value maps", t => {
    const initial = new Balance({ BTC: 12.34 }, Precision.Hundredth);
    const final = initial.add([{ BTC: 56.789 }, { LTC: -45.6, XMR: 1.2229 }]);

    t.deepEqual(initial.values, { BTC: 12.34 });
    t.deepEqual(
        final,
        new Balance({ BTC: 69.13, LTC: -45.6, XMR: 1.22 }, Precision.Hundredth)
    );
});

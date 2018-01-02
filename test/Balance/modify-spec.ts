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
import { Balance, IBalance, multiply, Precision, Value } from "../../src/index";

test("Should modify a balance according with the given function", t => {
    const initial = new Balance({ BTC: 100 }, Precision.Thousandth);
    const modifier = (
        value: number,
        symbol: string,
        precision: Precision,
        originalBalance: IBalance
    ) => {
        t.is(value, 100);
        t.is(symbol, "BTC");
        t.is(precision, Precision.Thousandth);
        t.is(originalBalance, initial);

        return value + 55;
    };

    t.deepEqual(
        initial.modify(modifier),
        new Balance({ BTC: 155 }, Precision.Thousandth)
    );
});

test("Should modify a balance according with the given function with custom precision", t => {
    const initial = new Balance(
        { BTC: 1.1234567891234567 },
        Precision.TenBillionth
    );
    const modifier = (
        value: number,
        symbol: string,
        precision: Precision,
        originalBalance: IBalance
    ) => {
        t.is(value, 1.1234567891);
        t.is(symbol, "BTC");
        t.is(precision, Precision.TenThousandth);
        t.is(originalBalance, initial);

        return multiply(value, 123, precision);
    };

    t.deepEqual(
        initial.modify(modifier, Precision.TenThousandth),
        new Balance({ BTC: 138.1852 }, Precision.TenThousandth)
    );
});

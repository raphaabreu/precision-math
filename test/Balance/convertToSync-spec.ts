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
import { Balance, IValue, Precision, Value } from "../../src/index";

test("Should convert to currency in sync", t => {
    const initial = new Balance(
        { BTC: 12.345, LTC: 56.789 },
        Precision.Thousandth
    );
    const getRate = (
        fromSymbol: string,
        toSymbol: string,
        conversionPrecision?: Precision,
        originalValue?: IValue
    ) => {
        t.is(fromSymbol, "XMR");
        t.is(conversionPrecision, Precision.Thousandth);

        if (toSymbol === "BTC") {
            t.deepEqual(
                originalValue,
                new Value(12.345, toSymbol, Precision.Thousandth)
            );
            return 987.654;
        } else if (toSymbol === "LTC") {
            t.deepEqual(
                originalValue,
                new Value(56.789, toSymbol, Precision.Thousandth)
            );
            return 65.43;
        } else {
            t.fail("Symbol does not match.");
            return 0;
        }
    };

    t.deepEqual(
        initial.convertToSync("XMR", getRate),
        new Value(15908.293, "XMR", Precision.Thousandth)
    );
});

test("Should convert to currency in sync using custom precision", t => {
    const initial = new Balance(
        { BTC: 12.345, LTC: 56.789 },
        Precision.Thousandth
    );
    const getRate = (
        fromSymbol: string,
        toSymbol: string,
        conversionPrecision?: Precision,
        originalValue?: IValue
    ) => {
        t.is(fromSymbol, "XMR");
        t.is(conversionPrecision, Precision.HundredThousandth);

        if (toSymbol === "BTC") {
            t.deepEqual(
                originalValue,
                new Value(12.345, toSymbol, Precision.Thousandth)
            );
            return 987.65432;
        } else if (toSymbol === "LTC") {
            t.deepEqual(
                originalValue,
                new Value(56.789, toSymbol, Precision.Thousandth)
            );
            return 65.4321;
        } else {
            t.fail("Symbol does not match.");
            return 0;
        }
    };

    t.deepEqual(
        initial.convertToSync("XMR", getRate, Precision.HundredThousandth),
        new Value(15908.41611, "XMR", Precision.HundredThousandth)
    );
});

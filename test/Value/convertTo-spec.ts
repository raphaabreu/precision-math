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
import { IValue, Precision, Value } from "../../src/index";

const dummyRateLookup = (
    fromSymbol: string,
    toSymbol: string
): Promise<number> => {
    throw new Error("This function should not have been called.");
};

test("Should return the same value if trying to convert to the same symbol", t => {
    const initial = new Value(100, "BTC", Precision.Thousandth);

    return initial.convertTo("BTC", dummyRateLookup).then(final => {
        t.is(final, initial);
    });
});

test("Should return the same value if trying to convert to the same symbol with the same precision", t => {
    const initial = new Value(100, "BTC", Precision.Thousandth);

    return initial
        .convertTo("BTC", dummyRateLookup, Precision.Thousandth)
        .then(final => {
            t.is(final, initial);
        });
});

test("Should return the equivalent value if trying to convert to the same symbol but custom precision", t => {
    const initial = new Value(100, "BTC", Precision.Tenth);

    return initial
        .convertTo("BTC", dummyRateLookup, Precision.Thousandth)
        .then(final => {
            t.deepEqual(final, new Value(100, "BTC", Precision.Thousandth));
        });
});

test("Should return zero value if trying to convert zero value with same precision", t => {
    const initial = new Value(0, "BTC", Precision.Hundredth);

    return initial.convertTo("LTC", dummyRateLookup).then(final => {
        t.deepEqual(final, new Value(0, "LTC", Precision.Hundredth));
    });
});

test("Should return zero value if trying to convert zero value with custom precision", t => {
    const initial = new Value(0, "BTC", Precision.Hundredth);

    return initial
        .convertTo("LTC", dummyRateLookup, Precision.Millionth)
        .then(final => {
            t.deepEqual(final, new Value(0, "LTC", Precision.Millionth));
        });
});

test("Should convert value", t => {
    const initial = new Value(100, "BTC", Precision.Tenth);

    const rateLookup = (
        fromSymbol: string,
        toSymbol: string,
        conversionPrecision?: number,
        originalValue?: IValue
    ): Promise<number> => {
        t.is(fromSymbol, "LTC");
        t.is(toSymbol, "BTC");
        t.is(conversionPrecision, Precision.Tenth);
        t.is(originalValue, initial);

        return Promise.resolve(120);
    };

    return initial.convertTo("LTC", rateLookup).then(final => {
        t.deepEqual(final, new Value(12000, "LTC", Precision.Tenth));
    });
});

test("Should convert value with custom precision", t => {
    const initial = new Value(123, "XRP", Precision.Tenth);

    const rateLookup = (
        fromSymbol: string,
        toSymbol: string,
        conversionPrecision?: Precision,
        originalValue?: IValue
    ): Promise<number> => {
        t.is(fromSymbol, "BTC");
        t.is(toSymbol, "XRP");
        t.is(conversionPrecision, Precision.TenThousandth);
        t.is(originalValue, initial);

        return Promise.resolve(0.123456789);
    };

    return initial
        .convertTo("BTC", rateLookup, Precision.TenThousandth)
        .then(final => {
            t.deepEqual(
                final,
                new Value(15.1852, "BTC", Precision.TenThousandth)
            );
        });
});

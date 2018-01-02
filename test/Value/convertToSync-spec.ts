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

const dummyRateLookupSync = (fromSymbol: string, toSymbol: string): number => {
    throw new Error("This function should not have been called.");
};

test("Should return the same value in sync if trying to convert to the same symbol", t => {
    const initial = new Value(100, "BTC", Precision.Hundredth);
    const final = initial.convertToSync("BTC", dummyRateLookupSync);

    t.is(final, initial);
});

test("Should return the same value in sync if trying to convert to the same symbol with the same precision", t => {
    const initial = new Value(100, "BTC", Precision.Hundredth);
    const final = initial.convertToSync(
        "BTC",
        dummyRateLookupSync,
        Precision.Hundredth
    );

    t.is(final, initial);
});

test("Should return the equivalent in sync value if trying to convert to the same symbol but custom precision", t => {
    const initial = new Value(100, "BTC", Precision.Tenth);
    const final = initial.convertToSync(
        "BTC",
        dummyRateLookupSync,
        Precision.Thousandth
    );

    t.deepEqual(final, new Value(100, "BTC", Precision.Thousandth));
});

test("Should return zero value in sync if trying to convert zero value without custom precision", t => {
    const initial = new Value(0, "BTC", Precision.Thousandth);
    const final = initial.convertToSync("LTC", dummyRateLookupSync);

    t.deepEqual(final, new Value(0, "LTC", Precision.Thousandth));
});

test("Should return zero value in sync if trying to convert zero value with custom precision", t => {
    const initial = new Value(0, "BTC", Precision.Thousandth);
    const final = initial.convertToSync(
        "LTC",
        dummyRateLookupSync,
        Precision.HundredBillionth
    );

    t.deepEqual(final, new Value(0, "LTC", Precision.HundredBillionth));
});

test("Should convert value in sync", t => {
    const initial = new Value(123, "BTC", Precision.Tenth);

    const rateLookup = (
        fromSymbol: string,
        toSymbol: string,
        conversionPrecision: Precision,
        originalValue: IValue
    ) => {
        t.is(fromSymbol, "LTC");
        t.is(toSymbol, "BTC");
        t.is(conversionPrecision, Precision.Tenth);
        t.is(originalValue, initial);

        return 0.123456789;
    };

    const final = initial.convertToSync("LTC", rateLookup);

    t.deepEqual(final, new Value(15.2, "LTC", Precision.Tenth));
});

test("Should convert value in sync with custom precision", t => {
    const initial = new Value(123, "XRP", Precision.Tenth);

    const rateLookup = (
        fromSymbol: string,
        toSymbol: string,
        conversionPrecision: Precision,
        originalValue: IValue
    ): number => {
        t.is(fromSymbol, "BTC");
        t.is(toSymbol, "XRP");
        t.is(conversionPrecision, Precision.TenThousandth);
        t.is(originalValue, initial);

        return 0.123456789;
    };

    const final = initial.convertToSync(
        "BTC",
        rateLookup,
        Precision.TenThousandth
    );

    t.deepEqual(final, new Value(15.1852, "BTC", Precision.TenThousandth));
});

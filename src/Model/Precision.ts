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

/**
 * Precision alternatives.
 */
export enum Precision {
    /**
     * One full unit.
     */
    Integer = 1,

    /**
     * One tenth of a unit.
     * Common usage: 10^-1.
     */
    Tenth = 0.1,

    /**
     * One hundredth of a unit.
     * Common usage: 10^-2, cent.
     */
    Hundredth = 0.01,

    /**
     * One cent of a unit === one hundredth.
     */
    Cent = Hundredth,

    /**
     * One thousandth of a unit.
     * Common usage: 10^-3, mBTC.
     */
    Thousandth = 0.001,

    /**
     * One millie of a unit === one thousandth.
     */
    Millie = Thousandth,

    /**
     * One ten thousandth of a unit.
     * Common usage: 10^-4.
     */
    TenThousandth = 0.0001,

    /**
     * One hundred thousandth of a unit.
     * Common usage: 10^-5.
     */
    HundredThousandth = 0.00001,

    /**
     * One millionth of a unit.
     * Common usage: 10^-6, micron, μBTC.
     */
    Millionth = 0.000001,

    /**
     * One bit of a unit === one millionth.
     */
    Bit = Millionth,

    /**
     * One millionth of a unit.
     * Common usage: 10^-7.
     */
    TenMillionth = 0.0000001,

    /**
     * One hundred millionth of a unit.
     * Common usage: 10^-8, sat, satoshi.
     */
    HundredMillionth = 0.00000001,

    /**
     * One satoshi of a unit === one hundred millionth.
     */
    Satoshi = HundredMillionth,

    /**
     * One billionth of a unit.
     * Common usage: 10^-9.
     */
    Billionth = 0.000000001,

    /**
     * One billionth of a unit.
     * Common usage: 10^-10, csat, satoshi cent.
     */
    TenBillionth = 0.0000000001,

    /**
     * One satoshi cent of a unit === one ten billionth.
     */
    SatoshiCent = TenBillionth,

    /**
     * One hundred billionth of a unit.
     * Common usage: 10^-11.
     */
    HundredBillionth = 0.00000000001
}

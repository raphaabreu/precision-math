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
import { Precision, toFixed } from "../../src/index";

test("Should convert numbers to string with decimal places according with supplied precision", t => {
    t.is(toFixed(0, Precision.Integer), " 0");
    t.is(toFixed(0, Precision.Tenth), " 0.0");
    t.is(toFixed(0, Precision.Hundredth), " 0.00");
    t.is(toFixed(0, Precision.Thousandth), " 0.000");
    t.is(toFixed(0, Precision.TenThousandth), " 0.0000");
    t.is(toFixed(0, Precision.HundredThousandth), " 0.00000");
    t.is(toFixed(0, Precision.Millionth), " 0.000000");
    t.is(toFixed(0, Precision.TenMillionth), " 0.0000000");
    t.is(toFixed(0, Precision.HundredMillionth), " 0.00000000");
    t.is(toFixed(0, Precision.Billionth), " 0.000000000");
    t.is(toFixed(0, Precision.TenBillionth), " 0.0000000000");
    t.is(toFixed(0, Precision.HundredBillionth), " 0.00000000000");

    t.is(toFixed(Math.PI, Precision.Integer), " 3");
    t.is(toFixed(Math.PI, Precision.Tenth), " 3.1");
    t.is(toFixed(Math.PI, Precision.Hundredth), " 3.14");
    t.is(toFixed(Math.PI, Precision.Thousandth), " 3.142");
    t.is(toFixed(Math.PI, Precision.TenThousandth), " 3.1416");
    t.is(toFixed(Math.PI, Precision.HundredThousandth), " 3.14159");
    t.is(toFixed(Math.PI, Precision.Millionth), " 3.141593");
    t.is(toFixed(Math.PI, Precision.TenMillionth), " 3.1415927");
    t.is(toFixed(Math.PI, Precision.HundredMillionth), " 3.14159265");
    t.is(toFixed(Math.PI, Precision.Billionth), " 3.141592654");
    t.is(toFixed(Math.PI, Precision.TenBillionth), " 3.1415926536");
    t.is(toFixed(Math.PI, Precision.HundredBillionth), " 3.14159265359");

    t.is(toFixed(-Math.PI, Precision.Integer), "-3");
    t.is(toFixed(-Math.PI, Precision.Tenth), "-3.1");
    t.is(toFixed(-Math.PI, Precision.Hundredth), "-3.14");
    t.is(toFixed(-Math.PI, Precision.Thousandth), "-3.142");
    t.is(toFixed(-Math.PI, Precision.TenThousandth), "-3.1416");
    t.is(toFixed(-Math.PI, Precision.HundredThousandth), "-3.14159");
    t.is(toFixed(-Math.PI, Precision.Millionth), "-3.141593");
    t.is(toFixed(-Math.PI, Precision.TenMillionth), "-3.1415927");
    t.is(toFixed(-Math.PI, Precision.HundredMillionth), "-3.14159265");
    t.is(toFixed(-Math.PI, Precision.Billionth), "-3.141592654");
    t.is(toFixed(-Math.PI, Precision.TenBillionth), "-3.1415926536");
    t.is(toFixed(-Math.PI, Precision.HundredBillionth), "-3.14159265359");
});

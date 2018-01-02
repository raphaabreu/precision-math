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
import { add, Precision } from "../../src/index";

test("Should add numbers to desired precision", t => {
    t.is(add(0.1, 0.2, Precision.Hundredth), 0.3);
    t.is(add(0.3, 0.6, Precision.Hundredth), 0.9);

    t.is(add(Math.E, Math.PI, Precision.Integer), 6);
    t.is(add(Math.E, Math.PI, Precision.Tenth), 5.9);
    t.is(add(Math.E, Math.PI, Precision.Hundredth), 5.86);
    t.is(add(Math.E, Math.PI, Precision.Thousandth), 5.86);
    t.is(add(Math.E, Math.PI, Precision.TenThousandth), 5.8599);
    t.is(add(Math.E, Math.PI, Precision.HundredThousandth), 5.85987);
    t.is(add(Math.E, Math.PI, Precision.Millionth), 5.859874);
    t.is(add(Math.E, Math.PI, Precision.TenMillionth), 5.8598745);
    t.is(add(Math.E, Math.PI, Precision.HundredMillionth), 5.85987448);
    t.is(add(Math.E, Math.PI, Precision.Billionth), 5.859874482);
    t.is(add(Math.E, Math.PI, Precision.TenBillionth), 5.859874482);
    t.is(add(Math.E, Math.PI, Precision.HundredBillionth), 5.85987448205);
});

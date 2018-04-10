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
import { Balance, Precision } from "../../src/index";

test("Should create new Balance ceiling the value to given precision", t => {
    process.env.STRICT_PRECISION = "true";

    t.deepEqual(
        Balance.ceil(
            {
                BTC: 45.12345679,
                XMR: -18.19765432,
                LTC: 40.69257802
            },
            Precision.Hundredth
        ),
        new Balance({ BTC: 45.13, XMR: -18.19, LTC: 40.7 }, Precision.Hundredth)
    );

    process.env.STRICT_PRECISION = undefined;
});

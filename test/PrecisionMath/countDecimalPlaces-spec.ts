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
import { countDecimalPlaces, Precision } from "../../src/index";

test("Should count the number of decimal places on the string representation", t => {
    t.is(countDecimalPlaces(".05"), 2);
    t.is(countDecimalPlaces(".5"), 1);
    t.is(countDecimalPlaces("1"), 0);
    t.is(countDecimalPlaces("25e-100"), 100);
    t.is(countDecimalPlaces("2.5e-99"), 100);
    t.is(countDecimalPlaces(".5e1"), 0);
    t.is(countDecimalPlaces(".25e1"), 1);

    t.is(countDecimalPlaces("-.05"), 2);
    t.is(countDecimalPlaces("-.5"), 1);
    t.is(countDecimalPlaces("-1"), 0);
    t.is(countDecimalPlaces("-25e-100"), 100);
    t.is(countDecimalPlaces("-2.5e-99"), 100);
    t.is(countDecimalPlaces("-.5e1"), 0);
    t.is(countDecimalPlaces("-.25e1"), 1);
});

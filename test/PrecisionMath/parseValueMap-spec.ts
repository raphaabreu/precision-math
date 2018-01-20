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
import { parseValueMap } from "../../src/index";

test("Should parse string and number based maps as IValueMaps", t => {
    t.deepEqual(
        parseValueMap({ A: 1, B: 2, C: "3", D: 0, E: "0", F: "1e-8" }),
        { A: 1, B: 2, C: 3, D: 0, E: 0, F: 1e-8 }
    );
});

test("Should throw if trying to parse an object map as IValueMap", t => {
    const value = { test: { B: "a" } };
    const error = t.throws(() => {
        parseValueMap(value);
    });

    t.is(error.message, "Value '[object Object]' should be a number");
});

test("Should throw if trying to parse a non-number string as IValueMap", t => {
    const value = { A: "574.6a" };
    const error = t.throws(() => {
        parseValueMap(value);
    });

    t.is(error.message, "Value '574.6a' should be a number");
});

test("Should throw if trying to parse an empty string as IValueMap", t => {
    const value = { A: "" };
    const error = t.throws(() => {
        parseValueMap(value);
    });

    t.is(error.message, "Value '' should be a number");
});

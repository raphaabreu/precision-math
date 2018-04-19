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

import { VectorMath } from "../../src/index";

test("Should normalizeSum of a vector", t => {
    t.deepEqual(VectorMath.normalizeSum({}), {});
    t.deepEqual(VectorMath.normalizeSum({ A: 1, B: undefined, C: 0, D: -1 }), {
        A: 1,
        B: undefined,
        C: 0,
        D: -1
    });
    t.deepEqual(VectorMath.normalizeSum({ A: 33, B: 12, C: -4, D: -85 }), {
        A: 33 / 89,
        B: 12 / 89,
        C: -4 / 89,
        D: -85 / 89
    });
    t.deepEqual(VectorMath.normalizeSum({ A: 10, B: 20, C: 30, D: -54 }), {
        A: 10 / 60,
        B: 20 / 60,
        C: 30 / 60,
        D: -54 / 60
    });
    t.deepEqual(
        VectorMath.normalizeSum({
            A: 10,
            B: 20,
            C: 30,
            D: 40,
            E: -1,
            F: -2,
            G: -3,
            H: -4
        }),
        {
            A: 10 / 100,
            B: 20 / 100,
            C: 30 / 100,
            D: 40 / 100,
            E: -1 / 100,
            F: -2 / 100,
            G: -3 / 100,
            H: -4 / 100
        }
    );
});

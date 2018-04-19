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

test("Should return a vector with target dimension undefined when collapsing a vector that is empty", t => {
    t.deepEqual(
        VectorMath.collapseSync(
            {},
            "A",
            (toDimension, fromDimension, amount) => {
                t.fail("Should not have been called");
                return Number.NaN;
            }
        ),
        { A: undefined }
    );
});

test("Should return a vector with target dimension undefined when collapsing a vector that has a dimension whose value is undefined", t => {
    t.deepEqual(
        VectorMath.collapseSync(
            { A: 1, B: undefined, C: 0 },
            "A",
            (toDimension, fromDimension, amount) => {
                t.fail("Should not have been called");
                return Number.NaN;
            }
        ),
        { A: undefined }
    );
});

test("Should not call getRate when collapsing an single dimension vector to its only dimension", t => {
    t.deepEqual(
        VectorMath.collapseSync(
            { A: 10 },
            "A",
            (toDimension, fromDimension, amount) => {
                t.fail("Should not have been called");
                return Number.NaN;
            }
        ),
        { A: 10 }
    );
});

test("Should not call getRate when collapsing a zero single dimension vector", t => {
    t.deepEqual(
        VectorMath.collapseSync(
            { B: 0 },
            "A",
            (toDimension, fromDimension, amount) => {
                t.fail("Should not have been called");
                return Number.NaN;
            }
        ),
        { A: 0 }
    );
});

test("Should collapseSync a single dimension vector", t => {
    t.plan(4);

    t.deepEqual(
        VectorMath.collapseSync(
            { B: 10 },
            "A",
            (toDimension, fromDimension, amount) => {
                t.is(toDimension, "A");
                t.is(fromDimension, "B");
                t.is(amount, 10);

                return 1 / 5;
            }
        ),
        { A: 2 }
    );
});

test("Should collapseSync a multi dimension vector", t => {
    t.plan(5);

    t.deepEqual(
        VectorMath.collapseSync(
            { A: 5, B: 10, C: 20 },
            "A",
            (toDimension, fromDimension, amount) => {
                t.is(toDimension, "A");
                if (fromDimension === "B") {
                    t.is(amount, 10);
                    return 1 / 5;
                } else {
                    t.is(amount, 20);
                    return 2;
                }
            }
        ),
        { A: 47 }
    );
});

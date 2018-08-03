/*
 * Copyright (C) 2018 Atlas Project LLC
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

test("Should multiply a vector by a scalar", t => {
  t.deepEqual(VectorMath.multiply({ A: 1 }, 3), {
    A: 3
  });
  t.deepEqual(VectorMath.multiply({ A: 1, B: undefined }, 4), {
    A: 4,
    B: undefined
  });
  t.deepEqual(VectorMath.multiply({ A: 1, B: 0.5, C: 0 }, 5), {
    A: 5,
    B: 2.5,
    C: 0
  });
});

test("Should multiply vector by another vector", t => {
  t.deepEqual(VectorMath.multiply({ A: 1 }, { B: 2 }), {
    A: 1
  });
  t.deepEqual(VectorMath.multiply({ A: 1, B: undefined }, { B: 2 }), {
    A: 1,
    B: undefined
  });
  t.deepEqual(VectorMath.multiply({ A: 1, B: 0 }, { B: 2 }), {
    A: 1,
    B: 0
  });
  t.deepEqual(VectorMath.multiply({ A: 1, B: 1 }, { B: 2 }), {
    A: 1,
    B: 2
  });
  t.deepEqual(VectorMath.multiply({ A: 1, B: 1 }, { B: 2, C: 2 }), {
    A: 1,
    B: 2
  });
  t.deepEqual(VectorMath.multiply({ A: 1, B: 1, C: 3 }, { B: 2, C: 2 }), {
    A: 1,
    B: 2,
    C: 6
  });
});

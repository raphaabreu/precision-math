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

test("Should normalize of a vector", t => {
  t.deepEqual(VectorMath.normalize({}), {});
  t.deepEqual(VectorMath.normalize({ A: 10, B: undefined, C: 0, D: -10 }), {
    A: 1,
    B: undefined,
    C: 0,
    D: -1
  });
  t.deepEqual(VectorMath.normalize({ A: 33, B: 12, C: -4, D: -85 }), {
    A: 33 / 85,
    B: 12 / 85,
    C: -4 / 85,
    D: -85 / 85
  });
  t.deepEqual(VectorMath.normalize({ A: 10, B: 20, C: 30, D: -54 }), {
    A: 10 / 54,
    B: 20 / 54,
    C: 30 / 54,
    D: -54 / 54
  });
  t.deepEqual(
    VectorMath.normalize({
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
      A: 10 / 40,
      B: 20 / 40,
      C: 30 / 40,
      D: 40 / 40,
      E: -1 / 40,
      F: -2 / 40,
      G: -3 / 40,
      H: -4 / 40
    }
  );
});

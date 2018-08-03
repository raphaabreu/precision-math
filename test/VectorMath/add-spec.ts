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

test("Should add two vectors", t => {
  t.deepEqual(VectorMath.add({ A: 1 }, { A: -0.4 }), {
    A: 0.6
  });
  t.deepEqual(VectorMath.add({ A: 1, B: undefined }, { B: -0.4 }), {
    A: 1,
    B: -0.4
  });
  t.deepEqual(VectorMath.add({ A: 1, B: 0.5 }, { A: -0.4, B: 2 }), {
    A: 0.6,
    B: 2.5
  });
});

test("Should add an array of vectors", t => {
  t.deepEqual(
    VectorMath.add([{ A: 1 }, { A: -0.4 }, { C: 10 }, { C: -2, A: 2 }, {}]),
    {
      A: 2.6,
      C: 8
    }
  );
  t.deepEqual(VectorMath.add([{ A: 1 }, { B: -0.4 }, { B: -0.2, C: 0 }]), {
    A: 1,
    B: -0.6000000000000001,
    C: 0
  });
  t.deepEqual(
    VectorMath.add([
      { A: 1 },
      { B: 0.5 },
      { A: -0.4 },
      { B: 2 },
      { C: 0, D: undefined }
    ]),
    {
      A: 0.6,
      B: 2.5,
      C: 0
    }
  );
});

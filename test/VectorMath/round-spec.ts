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

import { Precision, Rounding, VectorMath } from "../../src/index";

test("Should round a vector to nearest value", t => {
  t.deepEqual(VectorMath.round({}, Precision.Integer), {});
  t.deepEqual(
    VectorMath.round(
      { A: 1.23456789, B: undefined, C: 0, D: -1.23456789 },
      Precision.Millionth
    ),
    {
      A: 1.234568,
      B: undefined,
      C: 0,
      D: -1.234568
    }
  );
  t.deepEqual(
    VectorMath.round(
      { A: 1.23456789, B: undefined, C: 0, D: -1.23456789 },
      Precision.HundredBillionth
    ),
    {
      A: 1.23456789,
      B: undefined,
      C: 0,
      D: -1.23456789
    }
  );
});

test("Should round a vector ceiling it", t => {
  t.deepEqual(
    VectorMath.round(
      { A: 1.23456789, B: -1.23456789 },
      Precision.Hundredth,
      Rounding.Ceil
    ),
    {
      A: 1.24,
      B: -1.23
    }
  );
});

test("Should round a vector flooring it", t => {
  t.deepEqual(
    VectorMath.round(
      { A: 1.23456789, B: -1.23456789 },
      Precision.Hundredth,
      Rounding.Floor
    ),
    {
      A: 1.23,
      B: -1.24
    }
  );
});

test("Should round a vector up", t => {
  t.deepEqual(
    VectorMath.round(
      { A: 1.23456789, B: -1.23456789 },
      Precision.Hundredth,
      Rounding.Up
    ),
    {
      A: 1.24,
      B: -1.24
    }
  );
});

test("Should round a vector down", t => {
  t.deepEqual(
    VectorMath.round(
      { A: 1.23456789, B: -1.23456789 },
      Precision.Hundredth,
      Rounding.Down
    ),
    {
      A: 1.23,
      B: -1.23
    }
  );
});

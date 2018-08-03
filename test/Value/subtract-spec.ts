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
import { Precision, Value } from "../../src/index";

test("Should subtract one value", t => {
  const initial = new Value(100, "BTC", Precision.Thousandth);
  const final = initial.subtract(new Value(55, "BTC", Precision.Thousandth));

  t.deepEqual(final, new Value(45, "BTC", Precision.Thousandth));
});

test("Should subtract multiple values", t => {
  const initial = new Value(100, "BTC", Precision.Thousandth);
  const final = initial.subtract(
    new Value(44, "BTC", Precision.Thousandth),
    new Value(-50, "BTC", Precision.Thousandth),
    new Value(13, "BTC", Precision.Thousandth)
  );

  t.deepEqual(final, new Value(93, "BTC", Precision.Thousandth));
});

test("Should throw if trying to subtract values of different symbols", t => {
  const initial = new Value(100, "BTC", Precision.Thousandth);
  const error = t.throws(() =>
    initial.subtract(
      new Value(44, "BTC", Precision.Thousandth),
      new Value(-50, "ETH", Precision.Thousandth),
      new Value(13, "BTC", Precision.Thousandth)
    )
  );

  t.is(
    error.message,
    "Cannot operate values with different symbols ETH / BTC."
  );
});

test("Should retain minimum precision when subtracting", t => {
  const initial: Value = new Value(100, "BTC", Precision.Integer);
  const final = initial.subtract(
    new Value(44, "BTC", Precision.Thousandth),
    new Value(-50, "BTC", Precision.Cent),
    new Value(13, "BTC", Precision.TenMillionth)
  );

  t.deepEqual(final, new Value(93, "BTC", Precision.TenMillionth));
});

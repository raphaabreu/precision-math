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
import { Balance, Precision, Value } from "../../src/index";

test("Should multiply by one factor", t => {
  const initial = new Balance({ BTC: 12.34, LTC: 56.78 }, Precision.Hundredth);
  const final = initial.multiply(2.3456);

  t.deepEqual(initial.values, { BTC: 12.34, LTC: 56.78 });
  t.deepEqual(
    final,
    new Balance({ BTC: 28.94, LTC: 133.18 }, Precision.Hundredth)
  );
});

test("Should multiply by multiple factors", t => {
  const initial = new Balance({ BTC: 12.34, LTC: 56.78 }, Precision.Hundredth);
  const final = initial.multiply(0.5, 1.2, 5.4);

  t.deepEqual(initial.values, { BTC: 12.34, LTC: 56.78 });
  t.deepEqual(
    final,
    new Balance({ BTC: 39.98, LTC: 183.97 }, Precision.Hundredth)
  );
});

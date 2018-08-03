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

import { Precision, Rounding, Value } from "../../src/index";

test.beforeEach(t => {
  process.env.STRICT_PRECISION = "true";
});

test.afterEach(t => {
  process.env.STRICT_PRECISION = undefined;
});

test("Should create new Value rounding amount to given precision", t => {
  t.deepEqual(
    Value.round(1.23456789, "BTC", Precision.Hundredth),
    new Value(1.23, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(1.23987654, "BTC", Precision.Hundredth),
    new Value(1.24, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23456789, "BTC", Precision.Hundredth),
    new Value(-1.23, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23987654, "BTC", Precision.Hundredth),
    new Value(-1.24, "BTC", Precision.Hundredth)
  );
});

test("Should create new Value flooring amount to given precision", t => {
  t.deepEqual(
    Value.round(1.23456789, "BTC", Precision.Hundredth, Rounding.Floor),
    new Value(1.23, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(1.23987654, "BTC", Precision.Hundredth, Rounding.Floor),
    new Value(1.23, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23456789, "BTC", Precision.Hundredth, Rounding.Floor),
    new Value(-1.24, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23987654, "BTC", Precision.Hundredth, Rounding.Floor),
    new Value(-1.24, "BTC", Precision.Hundredth)
  );
});

test("Should create new Value ceiling amount to given precision", t => {
  t.deepEqual(
    Value.round(1.23456789, "BTC", Precision.Hundredth, Rounding.Ceil),
    new Value(1.24, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(1.23987654, "BTC", Precision.Hundredth, Rounding.Ceil),
    new Value(1.24, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23456789, "BTC", Precision.Hundredth, Rounding.Ceil),
    new Value(-1.23, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23987654, "BTC", Precision.Hundredth, Rounding.Ceil),
    new Value(-1.23, "BTC", Precision.Hundredth)
  );
});

test("Should create new Value rounding amount up to given precision", t => {
  t.deepEqual(
    Value.round(1.23456789, "BTC", Precision.Hundredth, Rounding.Up),
    new Value(1.24, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(1.23987654, "BTC", Precision.Hundredth, Rounding.Up),
    new Value(1.24, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23456789, "BTC", Precision.Hundredth, Rounding.Up),
    new Value(-1.24, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23987654, "BTC", Precision.Hundredth, Rounding.Up),
    new Value(-1.24, "BTC", Precision.Hundredth)
  );
});

test("Should create new Value rounding amount down to given precision", t => {
  t.deepEqual(
    Value.round(1.23456789, "BTC", Precision.Hundredth, Rounding.Down),
    new Value(1.23, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(1.23987654, "BTC", Precision.Hundredth, Rounding.Down),
    new Value(1.23, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23456789, "BTC", Precision.Hundredth, Rounding.Down),
    new Value(-1.23, "BTC", Precision.Hundredth)
  );
  t.deepEqual(
    Value.round(-1.23987654, "BTC", Precision.Hundredth, Rounding.Down),
    new Value(-1.23, "BTC", Precision.Hundredth)
  );
});

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
import { parseFloat } from "../../src/index";

test("Should parse string and numbers as floats", t => {
  t.is(parseFloat(-5.3), -5.3);
  t.is(parseFloat(0), 0);
  t.is(parseFloat(14.2), 14.2);
  t.is(parseFloat("-10"), -10);
  t.is(parseFloat("0"), 0);
  t.is(parseFloat("551.1"), 551.1);
});

test("Should throw if trying to parse an object as float", t => {
  const value = { test: "a" };
  const error = t.throws(() => {
    parseFloat(value);
  });

  t.is(error.message, "Value '[object Object]' should be a number");
});

test("Should throw if trying to parse a non-number string as float", t => {
  const value = "574.6a";
  const error = t.throws(() => {
    parseFloat(value);
  });

  t.is(error.message, "Value '574.6a' should be a number");
});

test("Should throw if trying to parse an empty string as float", t => {
  const value = "";
  const error = t.throws(() => {
    parseFloat(value);
  });

  t.is(error.message, "Value '' should be a number");
});

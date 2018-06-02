// Copyright 2018 Ryan Dahl <ry@tinyclouds.org>
// All rights reserved. MIT License.
// This test is executed as part of integration_test.go
// But it can also be run manually:
//  ./deno tests.ts
// There must also be a static file http server running on localhost:4545
// serving the deno project directory. Try this:
//   http-server -p 4545 --cors .
import { test, assert, assertEqual } from "./testing/testing.ts";
import { readFileSync, writeFileSync, tempDirSync } from "deno";

test(async function tests_test() {
  assert(true);
});

test(async function tests_fetch() {
  const response = await fetch("http://localhost:4545/package.json");
  const json = await response.json();
  assertEqual(json.name, "deno");
});

test(async function tests_readFileSync() {
  let data = readFileSync("package.json");
  if (!data.byteLength) {
    throw Error(
      `Expected positive value for data.byteLength ${data.byteLength}`
    );
  }
  const decoder = new TextDecoder("utf-8");
  const json = decoder.decode(data);
  const pkg = JSON.parse(json);
  assertEqual(pkg.name, "deno");
});

test(async function tests_writeFileSync() {
  const enc = new TextEncoder();
  const data = enc.encode("Hello");
  const tempDir = tempDirSync("/tmp", "denotest");
  const fn = tempDir.concat("/test.txt");
  writeFileSync(fn, data, 0o666);
  const dataRead = readFileSync(fn);
  const dec = new TextDecoder("utf-8");
  const actual = dec.decode(dataRead);
  assertEqual("Hello", actual);
});

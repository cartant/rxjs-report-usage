import { SomeDecorator } from "some-decorator";

@SomeDecorator
class SomeClass {
  someProperty = 42;
  #somePrivateProperty = 54;
  someMethod() {}
  #somePrivateMethod() {}
}

const someBigInt = 42n;
const somNumericSeparator = 4_2;

let someLogicalAssignment = true;
someLogicalAssignment &&= false;

const someOptionalChaining = {};
const someNullishCoalescingOperator = someOptionalChaining?.someProperty ?? false;
const { someProperty, ...someObjectRestSpread } = {};

try {
  throw new Error("SomeError");
} catch {
  console.error("Went boom!");
}

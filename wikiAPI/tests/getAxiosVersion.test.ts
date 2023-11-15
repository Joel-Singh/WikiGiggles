import { expect } from "chai";
import { getAxiosVersion } from "../getAxiosVersion";
import { test } from "mocha";


test("Axios version is correct", () => {
  expect(getAxiosVersion()).to.match(/^\d\.\d\.\d$/);
})

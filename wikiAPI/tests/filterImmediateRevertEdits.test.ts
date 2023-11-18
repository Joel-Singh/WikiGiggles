import { expect } from "chai";
import filterImmediateRevertEdits from "../util/filterImmediateRevertEdits";
import revision from "../util/revision";
import { test } from "mocha";
import { getRandomRevId } from "./getRandomRevId";

test("filters out a single immediately reverted edit", () => {
  const revertedEditByteDifference = 30;
  const originalEditSize = 100;
  const immediatelyRevertEditId = 1234567890;

  const revisionArray  = [
    {
      revid: immediatelyRevertEditId,
      tags: ["mw-manual-revert"],
      size: originalEditSize - revertedEditByteDifference,
      byteDifference: -revertedEditByteDifference,
    },
    {
      revid: getRandomRevId(),
      tags: [],
      size: originalEditSize,
      byteDifference: revertedEditByteDifference
    },
  ];

  expect(filterImmediateRevertEdits(revisionArray)[0]).to.equal(
    immediatelyRevertEditId,
  );
});

test("filters out a single immediately reverted edit", () => {
  const revertedEditByteDifference = 50;
  const originalEditSize = 100;
  const immediatelyRevertEditId = 1234567890;

  const revisionArray = [
    {
      revid: immediatelyRevertEditId,
      size: originalEditSize - revertedEditByteDifference,
      tags: ["mw-manual-revert"],
      byteDifference: -revertedEditByteDifference
    },
    {
      revid: 113081298,
      size: originalEditSize + revertedEditByteDifference,
      tags: [],
      byteDifference: revertedEditByteDifference
    },
    {
      revid: getRandomRevId(),
      size: originalEditSize,
      tags: [],
      byteDifference: 0
    },
  ];

  expect(
    filterImmediateRevertEdits(revisionArray)[0],
    "filters right rev id",
  ).to.equal(immediatelyRevertEditId);
});

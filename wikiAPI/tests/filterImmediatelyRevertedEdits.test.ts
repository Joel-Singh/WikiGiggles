import { expect } from "chai";
import filterImmediatelyRevertEdits from "../util/filterImmediatelyRevertEdits";
import revision from "../util/revision";
import { test } from "mocha";
import { getRandomRevId } from "./getRandomRevId";

test("filters out a single immediately reverted edit", () => {
  const immediatelyRevertedEdit = {
    Id: 1234567890,
    size: 123,
  };

  const revisionArray: revision[] = [
    {
      revid: immediatelyRevertedEdit.Id,
      size: immediatelyRevertedEdit.size,
      tags: ["mw-manual-revert"],
    },
    {
      revid: 113081298,
      size: immediatelyRevertedEdit.size,
      tags: [],
    },
  ];

  expect(filterImmediatelyRevertEdits(revisionArray)[0]).to.equal(
    immediatelyRevertedEdit.Id,
  );
});

test("filters out a single immediately reverted edit", () => {
  const immediatelyRevertedEdit = {
    Id: 1234567890,
    Size: 123,
  };

  const revisionArray: revision[] = [
    {
      revid: getRandomRevId(),
      size: 1928,
      tags: [],
    },
    {
      revid: immediatelyRevertedEdit.Id,
      size: immediatelyRevertedEdit.Size,
      tags: ["mw-manual-revert"],
    },
    {
      revid: 113081298,
      size: immediatelyRevertedEdit.Size,
      tags: [],
    },
  ];

  expect(
    filterImmediatelyRevertEdits(revisionArray)[0],
    "filters right rev id",
  ).to.equal(immediatelyRevertedEdit.Id);
});

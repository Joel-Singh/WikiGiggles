import { expect } from "chai";
import filterImmediatelyRevertedEdits from "../util/filterImmediatelyRevertedEdits";
import revision from "../util/revision";
import { test } from "mocha";

test("filters out a single immediately reverted edit", () => {
  const immediatelyRevertedEdit = {
    Id: 1234567890,
    Size: 123
  }

  const revisionArray: revision[] = [
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

  expect(filterImmediatelyRevertedEdits(revisionArray)[0]).to.equal(
    immediatelyRevertedEdit.Id,
  );
});

test("filters out a single immediately reverted edit", () => {
  const immediatelyRevertedEdit = {
    Id: 1234567890,
    Size: 123
  }

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

  expect(filterImmediatelyRevertedEdits(revisionArray)[0], "filters right rev id").to.equal(
    immediatelyRevertedEdit.Id,
  );
});

function getRandomRevId() {
  function generateRandomDigit() {
    return Math.floor(Math.random() * 10);
  }

  let id = ''
  for(let i = 1; i <= 10; i++) {
    id += generateRandomDigit();
  }

  return parseInt(id);
}

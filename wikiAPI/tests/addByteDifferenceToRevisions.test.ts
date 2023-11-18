import { test } from "mocha";
import revision from "../util/revision";
import { getRandomRevId } from "./getRandomRevId";
import addByteDifferenceToRevisions from "../util/addByteDifferenceToRevisions";
import { expect } from "chai";

test("Add byte difference to a single revision", () => {
  const revisions = [
    {
      revid: getRandomRevId(),
      size: 123,
      tags: [],
    },
  ];
  const revisionsWithByteDifference = addByteDifferenceToRevisions(revisions);
  expect(revisionsWithByteDifference[0].byteDifference).to.equal(0);
});

test("Add byte difference to two revision", () => {
  const byteDifference = 1;
  const oldestRevision = {
    revid: getRandomRevId(),
    size: 123,
    tags: [],
  };

  const mostRecentRevision = {
    revid: getRandomRevId(),
    size: oldestRevision.size + byteDifference,
    tags: [],
  };

  const revisions: revision[] = [mostRecentRevision, oldestRevision];

  const revisionsWithByteDifference = addByteDifferenceToRevisions(revisions);

  expect(revisionsWithByteDifference[1].byteDifference).to.equal(0);
  expect(revisionsWithByteDifference[0].byteDifference).to.equal(
    byteDifference,
  );
});

test("Add byte difference to four revisions", () => {
  const revisions: revision[] = [
    {
      revid: getRandomRevId(),
      size: 3,
      tags: []
    },
    {
      revid: getRandomRevId(),
      size: 5,
      tags: []
    },
    {
      revid: getRandomRevId(),
      size: 1,
      tags: []
    },
    {
      revid: getRandomRevId(),
      size: 0,
      tags: []
    }
  ];

  const revisionsWithByteDifference = addByteDifferenceToRevisions(revisions);

  expect(revisionsWithByteDifference[3].byteDifference).to.equal(0);
  expect(revisionsWithByteDifference[2].byteDifference).to.equal(1);
  expect(revisionsWithByteDifference[1].byteDifference).to.equal(4);
  expect(revisionsWithByteDifference[0].byteDifference).to.equal(-2);
});

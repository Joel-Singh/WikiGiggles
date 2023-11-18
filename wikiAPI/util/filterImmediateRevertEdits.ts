import { revisionWithByteDifference } from "./addByteDifferenceToRevisions";
import revision from "./revision";

/**
  // @returns array of revision ids
 */
export default function filterImmediatelyRevertEdits(
  revisions: revisionWithByteDifference[],
): number[] {
  let immediatelyRevertedEdits: number[] = [];
  for (const [index, curRevision] of revisions.entries()) {
    const prevRevision = revisions[index + 1];

    const prevRevisionExists = prevRevision !== undefined
    if (!prevRevisionExists) {
      continue;
    }

    const hasManualRevertTag =
      revisions[index].tags.includes("mw-manual-revert");

    const correspondingByteDifference = -prevRevision.byteDifference === curRevision.byteDifference;

    if (hasManualRevertTag && correspondingByteDifference) {
      immediatelyRevertedEdits.push(curRevision.revid);
    }
  }
  return immediatelyRevertedEdits;
}

import revision from "./revision";

/**
  // @returns array of revision ids
 */
export default function filterImmediatelyRevertEdits(
  revisions: revision[],
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

    const sameSizeAsPrevious = prevRevision.size === curRevision.size;

    if (hasManualRevertTag && sameSizeAsPrevious) {
      immediatelyRevertedEdits.push(curRevision.revid);
    }
  }
  return immediatelyRevertedEdits;
}

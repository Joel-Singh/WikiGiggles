import type revision from "./revision";

export type revisionWithByteDifference = revision & { byteDifference: number };
export default function addByteDifferenceToRevisions(
  revisions: revision[],
): revisionWithByteDifference[] {
  const copyOfrevisions: Partial<revisionWithByteDifference>[] = [...revisions];
  for (const [index, revision] of copyOfrevisions.entries()) {
    if (index === copyOfrevisions.length - 1) {
      revision.byteDifference = 0;
      continue;
    }

    const prevRevision = copyOfrevisions[index + 1];
    revision.byteDifference = revision.size! - prevRevision.size!;
  }

  return copyOfrevisions as revisionWithByteDifference[];
}

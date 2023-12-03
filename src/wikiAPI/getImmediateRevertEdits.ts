import sendWikipediaAPIRequest from "./sendWikipediaAPIRequest";
import addByteDifferenceToRevisions from "./util/addByteDifferenceToRevisions";
import filterImmediateRevertEdits from "./util/filterImmediateRevertEdits";
import type revision from "./util/revision";

export default async function getImmediateRevertEdits(page: string): Promise<number[] | Error> {
  const mostRecent500RevisionsParams = {
    action: "query",
    format: "json",
    prop: "revisions",
    formatversion: "2",
    titles: page,
    rvprop: "ids|tags|size",
    rvlimit: "500",
  };


  const response = await sendWikipediaAPIRequest(mostRecent500RevisionsParams);
  if (isPageMissing(response)) {
    return new Error("page doesn't exist");
  }

  const parsedRevisions = parseRevisions(response);

  const parsedRevisionsWithByteDifference = addByteDifferenceToRevisions(parsedRevisions);

  const immediateRevertEdits = filterImmediateRevertEdits(parsedRevisionsWithByteDifference);
  if (immediateRevertEdits.length === 0) {
    return new Error("Page has no funnies")
  }

  return filterImmediateRevertEdits(parsedRevisionsWithByteDifference);

  function parseRevisions(wikipediaResponse: Record<string, any>): revision[] {
    return wikipediaResponse.data.query.pages[0].revisions;
  }

  function isPageMissing(wikipediaResponse: Record<string, any>) {
    const missing = wikipediaResponse.data.query.pages[0].missing
    return missing;
  }
}

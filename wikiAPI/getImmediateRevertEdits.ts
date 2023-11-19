import sendWikipediaAPIRequest from "./sendWikipediaAPIRequest";
import addByteDifferenceToRevisions from "./util/addByteDifferenceToRevisions";
import filterImmediateRevertEdits from "./util/filterImmediateRevertEdits";
import revision from "./util/revision";

export default async function getImmediateRevertEdits(page: string) {
  const mostRecent500RevisionsParams = {
    action: "query",
    format: "json",
    prop: "revisions",
    formatversion: "2",
    titles: page,
    rvprop: "ids|tags|size",
    rvlimit: "500",
  };

  function parseRevisions(wikipediaResponse: Record<string, any>): revision[] {
    return wikipediaResponse.data.query.pages[0].revisions;
  }
  const response = await sendWikipediaAPIRequest(mostRecent500RevisionsParams);

  const parsedRevisions = parseRevisions(response);

  const parsedRevisionsWithByteDifference = addByteDifferenceToRevisions(parsedRevisions);

  return filterImmediateRevertEdits(parsedRevisionsWithByteDifference);
}

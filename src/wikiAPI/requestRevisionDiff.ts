import sendWikipediaAPIRequest from "./sendWikipediaAPIRequest";

export default async function requestRevisionDiff(revisionId: string) {
  const params = {
    action: "compare",
    format: "json",
    fromrev: revisionId,
    torelative: "prev",
    prop: "diff",
    difftype: "inline",
    formatversion: "2",
  };
  const response = await sendWikipediaAPIRequest(params);
  return response.data.compare.body as string;
}

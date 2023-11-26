import axios, { type AxiosResponse } from "axios";
import { getAxiosVersion } from "./util/getAxiosVersion";

export default function sendWikipediaAPIRequest(params: Object) {
  const wikiAPIEndpoint = `https://en.wikipedia.org/w/api.php`;

  const headers = {
    "User-Agent": `WikiGiggles/0.0 (joelsingh788@gmail.org) axios/${getAxiosVersion()}`,
  };

  try {
    return axios.get(wikiAPIEndpoint, { params, headers });
  } catch (error) {
    throw error;
  }
}

export function getPageDataFromQueryResponse(
  response: AxiosResponse,
): Array<any> {
  return response.data.query.pages;
}

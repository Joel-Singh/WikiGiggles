import packageJSON from "../../package.json";

export function getAxiosVersion(): string {
  return packageJSON.dependencies.axios.slice(1);
}

import client from "./client";
import qs from "qs";

export const writeMemo = ({ title, body }) => client.post("/", { title, body });

export const readPost = ({ id }) => client.get(`/${id}`);

export const readList = ({ page }) => {
  const queryString = qs.stringify({
    page,
  });
  return client.get(`/memos?${queryString}`);
};

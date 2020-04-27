import client from "./client";

export const writeMemo = ({ title, body }) =>
  client.post("/write", { title, body });

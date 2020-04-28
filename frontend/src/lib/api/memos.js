import client from "./client";

export const writeMemo = ({ title, body }) => client.post("/", { title, body });

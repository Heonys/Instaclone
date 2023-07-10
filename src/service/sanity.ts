import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROKECT_ID,
  dataset: process.env.SANITY_PROKECT_DATASET,
  useCdn: false,
  apiVersion: "2023-07-10",
  token: process.env.SANITY_SECRET_TOKEN,
});

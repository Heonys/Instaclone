import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.SANITY_PROKECT_ID,
  dataset: process.env.SANITY_PROKECT_DATASET,
  useCdn: false,
  apiVersion: "2023-07-10",
  token: process.env.SANITY_SECRET_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}

export const assetURL = `https://${process.env.SANITY_PROKECT_ID}.api.sanity.io/v2021-06-07/assets/images/${process.env.SANITY_PROKECT_DATASET}`;

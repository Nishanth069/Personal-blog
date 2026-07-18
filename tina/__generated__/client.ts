import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: 'C:/Users/Nishanth/Desktop/Personal blog/tina/__generated__/.cache/1784291354607', url: 'http://localhost:4001/graphql', token: 'undefined', queries,  });
export default client;
  
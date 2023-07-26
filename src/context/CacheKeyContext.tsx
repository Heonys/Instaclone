import { createContext, useContext } from "react";

type CacheKeyValue = {
  postKey: string;
};

const CacheKeyContext = createContext<CacheKeyValue>({
  postKey: "/api/posts",
});

const useCacheKey = () => {
  return useContext(CacheKeyContext);
};

export { CacheKeyContext, useCacheKey };

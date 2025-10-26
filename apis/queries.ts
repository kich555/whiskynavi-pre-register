import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { api } from "./apis";

// if you prefer to declare everything in one file
export const queries = createQueryKeyStore({
  users: {
    all: null,
    me: () => ({
      queryKey: ["me"],
      queryFn: () => api.getMe(),
    }),
  },
});

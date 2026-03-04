import api from "./api";
import type { PhrasalVerb } from "@/types/phrasal-verb";

export async function getRandomPhrasalVerb(excludeIds: number[]): Promise<PhrasalVerb> {
  const res = await api.get('/phrasal-verb', {
    params: { excludeIds },
    paramsSerializer: {
      indexes: null,
    },
  });
  return res.data;
}
import { postEngduPart1, postEngduPart2, getEngduDetail } from '@/api/engdu';
import type { EngduPartResponse } from '@/api/engdu';
import { type LoaderFunctionArgs } from 'react-router';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const engduId = Number(params.engduId);

  const detail = await getEngduDetail(engduId);

  const isPart1Ready = detail.parts && detail.parts.length >= 1;
  const isPart2Ready = detail.parts && detail.parts.length >= 2;

  // part1이 없을 때만 생성 요청을 "한 번" 만든다 (공유 Promise)
  const part1CreatePromise = isPart1Ready ? null : postEngduPart1(engduId);

  // meta: GET에 이미 title이 있으면 그대로, 없으면 part1 생성 결과에서 title 보강
  const metaPromise = isPart1Ready
    ? Promise.resolve(detail.meta)
    : part1CreatePromise!.then((res: EngduPartResponse) => ({
        ...detail.meta,
        title: res.meta.title,
      }));

  // part1: 이미 있으면 그대로, 없으면 생성 결과 part1 사용
  const part1Promise = isPart1Ready
    ? Promise.resolve(detail.parts[0])
    : part1CreatePromise!.then((res: EngduPartResponse) => res.part);

  // part2: 이미 있으면 그대로, 없으면 part1 확보 후 생성
  const part2Promise = isPart2Ready
    ? Promise.resolve(detail.parts[1])
    : part1Promise.then(() => postEngduPart2(engduId)).then((res: EngduPartResponse) => res.part);

  return {
    engduId,
    meta: metaPromise,
    part1: part1Promise,
    part2: part2Promise,
    initial: {
      isPart1Ready,
      isPart2Ready,
    },
  };
};

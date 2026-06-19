import { useState } from 'react';
import { cn } from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard, getMyLeaderboard } from '@/api/runAndLearn';
import { useAuth } from '@/hooks/useAuth';
import RankingSkeleton from './skeleton/RankingSkeleton';
import Tab from '@/components/Tab/Tab';
import TabItem from '@/components/Tab/TabItem';
import RankingItem from './RankingItem';
import StatCard from './StatCard';

function Ranking() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'all_time'>('weekly');
  const { user } = useAuth();

  const rankingType = activeTab === 'weekly' ? 'WEEKLY' : 'ALL_TIME';

  const { data: leaderboard = [], isPending: isLeaderboardPending } = useQuery({
    queryKey: ['runAndLearn', 'leaderboard', activeTab],
    queryFn: () => getLeaderboard({ rankingType, size: 5 }),
  });

  const { data: myRanking, isPending: isMyRankingPending } = useQuery({
    queryKey: ['runAndLearn', 'leaderboard', 'me', activeTab],
    queryFn: () => getMyLeaderboard({ rankingType }),
    enabled: !!user,
  });

  const isLoading = isLeaderboardPending || (!!user && isMyRankingPending);

  return (
    <div
      className={cn(
        'scrollbar-none flex w-full flex-1 flex-col items-start gap-4 overflow-y-auto',
        // 모바일 (md 미만): 흰색 배경 X, 둥글기 X, 그림자 X, 패딩 X
        'rounded-none bg-transparent p-0 shadow-none',
        // 태블릿 (md 이상 lg 미만): 흰색 배경 O, 둥글기 X, 그림자 X, 위 32px(pt-8) 좌우 20px(px-5)
        'md:bg-surface-weak md:px-5 md:pt-8 md:pb-8',
        // 데스크톱 (lg 이상): 흰색 배경 O, 둥글기 2xl, 그림자 O, 패딩 30px
        'lg:rounded-2xl lg:p-[30px] lg:shadow-default',
      )}
    >
      {/* 탭 헤더 */}
      <Tab className="h-14 w-full border-0">
        <TabItem
          label="주간 랭킹"
          selected={activeTab === 'weekly'}
          onClick={() => setActiveTab('weekly')}
          className="w-full"
        />
        <TabItem
          label="역대 랭킹"
          selected={activeTab === 'all_time'}
          onClick={() => setActiveTab('all_time')}
          className="w-full"
        />
      </Tab>

      {isLoading ? (
        <RankingSkeleton />
      ) : (
        <>
          {/* 마이 랭킹 */}
          <div className="flex w-full flex-col items-start gap-2">
            <span className="font-pinkfong text-16 font-normal text-text-primary">마이 랭킹</span>
            <div className="grid w-full grid-cols-2 gap-3">
              <StatCard type="rank" value={myRanking?.rank ?? null} className="w-full" />
              <StatCard type="score" value={myRanking?.bestScore ?? null} className="w-full" />
            </div>
          </div>

          {/* top 5 명예의 전당 */}
          <div className="flex w-full flex-col items-start gap-2.5">
            <span className="font-pinkfong text-16 font-normal text-text-primary">
              top 5 명예의 전당
            </span>
            {leaderboard.length === 0 ? (
              <div className="flex w-full items-center justify-center rounded-xl border border-dashed border-border-default bg-surface-weak py-8">
                <span className="font-pretendard text-14 text-text-secondary">
                  아직 등록된 랭킹이 없습니다.
                </span>
              </div>
            ) : (
              <div className="flex w-full flex-col gap-3">
                {leaderboard.map((item, idx) => (
                  <RankingItem
                    key={`${activeTab}-${item.userName}-${item.achievedAt}-${idx}`}
                    rank={item.rank}
                    nickname={item.userName}
                    score={item.bestScore}
                    isMyRanking={!!user && item.userName === user.name}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Ranking;

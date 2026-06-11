import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard, getMyLeaderboard } from '@/api/runAndLearn';
import { useAuth } from '@/hooks/useAuth';
import RankingSkeleton from './skeleton/RankingSkeleton';
import RankingTabItem from './RankingTabItem';
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
    <div className="w-full h-full overflow-y-auto scrollbar-none bg-surface-weak flex flex-col gap-4 items-start p-[30px] rounded-2xl shadow-default">
      {/* 탭 헤더 */}
      <div className="w-full bg-surface-weak flex items-center justify-between gap-2.5 h-14 p-2 rounded-2xl shadow-default">
        <RankingTabItem
          label="주간 랭킹"
          selected={activeTab === 'weekly'}
          onClick={() => setActiveTab('weekly')}
          className="w-full"
        />
        <RankingTabItem
          label="역대 랭킹"
          selected={activeTab === 'all_time'}
          onClick={() => setActiveTab('all_time')}
          className="w-full"
        />
      </div>

      {isLoading ? (
        <RankingSkeleton />
      ) : (
        <>
          {/* 마이 랭킹 */}
          <div className="flex flex-col gap-2 w-full items-start">
            <span className="font-pinkfong font-normal text-16 text-text-primary">마이 랭킹</span>
            <div className="grid grid-cols-2 gap-3 w-full">
              <StatCard type="rank" value={myRanking?.rank ?? null} className="w-full" />
              <StatCard type="score" value={myRanking?.bestScore ?? null} className="w-full" />
            </div>
          </div>

          {/* top 5 명예의 전당 */}
          <div className="flex flex-col gap-2.5 w-full items-start">
            <span className="font-pinkfong font-normal text-16 text-text-primary">
              top 5 명예의 전당
            </span>
            {leaderboard.length === 0 ? (
              <div className="w-full py-8 flex items-center justify-center border border-dashed border-border-default rounded-xl bg-surface-weak">
                <span className="font-pretendard text-14 text-text-secondary">
                  아직 등록된 랭킹이 없습니다.
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                {leaderboard.slice(0, 5).map((item, idx) => (
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

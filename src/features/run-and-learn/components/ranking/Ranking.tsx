import { useState } from 'react';
import RankingTabItem from './RankingTabItem';
import RankingItem from './RankingItem';
import StatCard from './StatCard';

interface RankingData {
  rank: number;
  nickname: string;
  score: number;
}

const WEEKLY_RANKINGS: RankingData[] = [
  { rank: 1, nickname: '@ 울퉁불퉁한 오리너구리', score: 320 },
  { rank: 2, nickname: '@ 영리한 돌고래', score: 310 },
  { rank: 3, nickname: '@ 날렵한 치타', score: 290 },
  { rank: 4, nickname: '@ 울퉁불퉁한 오리너구리', score: 250 },
  { rank: 5, nickname: '@ 명랑한 펭귄', score: 210 },
];

const DAILY_RANKINGS: RankingData[] = [
  { rank: 1, nickname: '@ 용감한 사자', score: 450 },
  { rank: 2, nickname: '@ 친절한 판다', score: 420 },
  { rank: 3, nickname: '@ 날렵한 치타', score: 390 },
  { rank: 4, nickname: '@ 울퉁불퉁한 오리너구리', score: 320 },
  { rank: 5, nickname: '@ 명랑한 펭귄', score: 280 },
];

function Ranking() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'daily'>('weekly');

  const rankings = activeTab === 'weekly' ? WEEKLY_RANKINGS : DAILY_RANKINGS;

  const myRankingInfo = rankings.find(
    (item) => item.nickname === '@ 울퉁불퉁한 오리너구리' && item.rank === 4,
  ) || { rank: 4, score: 320 };

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
          label="일간 랭킹"
          selected={activeTab === 'daily'}
          onClick={() => setActiveTab('daily')}
          className="w-full"
        />
      </div>

      {/* 마이 랭킹 */}
      <div className="flex flex-col gap-2 w-full items-start">
        <span className="font-pinkfong font-normal text-16 text-text-primary">마이 랭킹</span>
        <div className="grid grid-cols-2 gap-3 w-full">
          <StatCard type="rank" value={myRankingInfo.rank} className="w-full" />
          <StatCard type="score" value={myRankingInfo.score} className="w-full" />
        </div>
      </div>

      {/* top 5 명예의 전당 */}
      <div className="flex flex-col gap-2.5 w-full items-start">
        <span className="font-pinkfong font-normal text-16 text-text-primary">
          top 5 명예의 전당
        </span>
        <div className="flex flex-col gap-3 w-full">
          {rankings.map((item) => (
            <RankingItem
              key={`${activeTab}-${item.rank}`}
              rank={item.rank}
              nickname={item.nickname}
              score={item.score}
              isMyRanking={item.nickname === '@ 울퉁불퉁한 오리너구리' && item.rank === 4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ranking;

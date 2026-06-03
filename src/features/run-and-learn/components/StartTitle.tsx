import imgStarLarge from '@/assets/game/start/start_star_large.svg';
import imgStarSmall from '@/assets/game/start/start_star_small.svg';
import imgDecoCurlRight from '@/assets/game/start/start_deco_curl_right.svg';
import imgDecoCurlLeft from '@/assets/game/start/start_deco_curl_left.svg';

// WebkitTextFillColor, WebkitBackgroundClip, paintOrder, WebkitTextStroke는
// Tailwind가 지원하지 않는 비표준 CSS 속성이므로 style 속성 사용 (GEMINI.md 허용 예외)
const titleGradientStyle = {
  background: 'linear-gradient(180deg, #ffffff 35.577%, #bcd8ff 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
};

export default function StartTitle() {
  return (
    // 피그마: flex row, gap-20, py-[11px], items-center, justify-center
    // 별/데코 장식들은 이 flex 컨테이너 기준으로 absolute overflow
    <div className="relative flex items-center justify-center gap-5 py-3">

      {/* ── 장식: 큰 별 왼쪽 (Figma: left-[-144px] top-[-38px] size-[266.94px] rotate-[47.83deg]) ── */}
      <div className="absolute left-[-144px] top-[-38px] w-[266.94px] h-[266.94px] flex items-center justify-center">
        <img src={imgStarLarge} alt="" className="w-[188.986px] h-[188.986px] rotate-[47.83deg]" />
      </div>

      {/* ── 장식: 큰 별 오른쪽 (Figma: right-[-130px] top-[82px] size-[230.712px] rotate-[104.68deg]) ── */}
      <div className="absolute right-[-130px] top-[82px] w-[230.712px] h-[230.712px] flex items-center justify-center">
        <img src={imgStarLarge} alt="" className="w-[188.986px] h-[188.986px] rotate-[104.68deg]" />
      </div>

      {/* ── 장식: 오른쪽 곡선 데코 (Figma: left-[518px] top-[34px] w-[93.182px] h-[48.171px] rotate-[-8.09deg]) ── */}
      <div className="absolute left-[518px] top-[34px] w-[93.182px] h-[48.171px] flex items-center justify-center">
        <img src={imgDecoCurlRight} alt="" className="w-[89px] h-[36px] rotate-[-8.09deg]" />
      </div>

      {/* ── 장식: 작은 별 + 왼쪽 곡선 데코 (Figma: left-[-13px] top-[211px] size-[71.155px] rotate-[-12.22deg]) ── */}
      <div className="absolute left-[-13px] top-[211px] w-[71.155px] h-[71.155px] flex items-center justify-center">
        <img src={imgStarSmall} alt="" className="w-[59.845px] h-[59.845px] rotate-[-12.22deg]" />
      </div>

      {/* ── 장식: 왼쪽 곡선 데코 (Figma: left-[-89px] top-[247px] w-[65.199px] h-[43.525px] rotate-[-20.29deg]) ── */}
      <div className="absolute left-[-89px] top-[247px] w-[65.199px] h-[43.525px] flex items-center justify-center">
        <img src={imgDecoCurlLeft} alt="" className="w-[60.644px] h-[23.986px] rotate-[-20.29deg]" />
      </div>

      {/* ── 본문: 제목 + 설명 ── */}
      <div className="relative flex flex-col items-start w-[545px]">

        {/* 제목 행: 런 앤 런 (flex row, gap-5, mb-[-50px]로 설명문과 겹침 처리) */}
        <div className="flex items-center justify-center gap-5 h-[315px] w-full mb-[-50px]">

          {/* 런 (왼쪽, -9도 회전) */}
          <div className="relative flex items-center justify-center shrink-0 w-[186px] h-[315px]">
            {/* 바깥 테두리 레이어 (배경) */}
            <span
              className="absolute -rotate-9 not-italic leading-[240px] w-[142px] h-[296px] font-pinkfong font-bold text-[200px] text-[#452508] select-none"
              style={{ WebkitTextStroke: '16px #452508' }}
            >
              런
            </span>
            {/* 내부 그라데이션 레이어 (전경) */}
            <span
              className="-rotate-9 not-italic leading-[240px] w-[142px] h-[296px] font-pinkfong font-bold text-[200px] relative z-10"
              style={titleGradientStyle}
            >
              런
            </span>
          </div>

          {/* 앤 (중앙) */}
          <div className="relative flex items-center justify-center shrink-0 w-[132px] h-[238px]">
            {/* 바깥 테두리 레이어 (배경) */}
            <span
              className="absolute not-italic leading-normal w-[132px] h-[238px] font-pinkfong font-bold text-[140px] text-[#452508] select-none"
              style={{ WebkitTextStroke: '16px #452508' }}
            >
              앤
            </span>
            {/* 내부 그라데이션 레이어 (전경) */}
            <span
              className="not-italic leading-normal w-[132px] h-[238px] font-pinkfong font-bold text-[140px] relative z-10"
              style={titleGradientStyle}
            >
              앤
            </span>
          </div>

          {/* 런 (오른쪽, +9도 회전) */}
          <div className="relative flex items-center justify-center shrink-0 w-[186px] h-[315px]">
            {/* 바깥 테두리 레이어 (배경) */}
            <span
              className="absolute rotate-9 not-italic leading-[240px] w-[142px] h-[296px] font-pinkfong font-bold text-[200px] text-[#452508] select-none"
              style={{ WebkitTextStroke: '16px #452508' }}
            >
              런
            </span>
            {/* 내부 그라데이션 레이어 (전경) */}
            <span
              className="rotate-9 not-italic leading-[240px] w-[142px] h-[296px] font-pinkfong font-bold text-[200px] relative z-10"
              style={titleGradientStyle}
            >
              런
            </span>
          </div>
        </div>

        {/* 설명 문구 */}
        <p className="shrink-0 not-italic leading-normal text-center text-[#452508] w-full font-pinkfong font-normal text-36">
          다가오는 문, 오답을 피해 끝까지 달려봐!
        </p>
      </div>
    </div>
  );
}

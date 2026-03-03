import PolicyLayout from './PolicyLayout';

function PrivacyPolicy() {
  return (
    <PolicyLayout title="개인정보처리방침" effectiveDate="2024년 3월 2일">
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">1. 개인정보의 처리 목적</h2>
          <p>잉듀(이하 “서비스”)는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>회원가입 및 본인 식별</li>
            <li>AI 기반 영어 학습 서비스 제공</li>
            <li>학습 이력 저장</li>
            <li>서비스 개선 및 통계 분석</li>
          </ol>
          <p>수집된 개인정보는 위 목적 이외의 용도로 이용되지 않습니다.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-20 font-bold">2. 처리하는 개인정보 항목</h2>
          <p>“서비스”는 다음의 개인정보를 수집·처리합니다.</p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold underline">(1) 회원가입 시</h3>
              <ul className="list-disc pl-5">
                <li>구글 계정 이메일</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold underline">(2) 서비스 이용 과정에서 자동 수집</h3>
              <ul className="list-disc pl-5">
                <li>접속 IP 주소</li>
                <li>쿠키(Cookie)</li>
                <li>서비스 이용 기록</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-bold underline">(3) 분석 도구 사용</h3>
              <p>
                “서비스”는 이용 행태 분석 및 서비스 개선을 위하여 Amplitude 분석 도구를 사용합니다.
              </p>
              <p>이 과정에서 다음 정보가 수집될 수 있습니다:</p>
              <ul className="list-disc pl-5">
                <li>접속 기기 정보</li>
                <li>브라우저 정보</li>
                <li>페이지 방문 기록</li>
                <li>버튼 클릭 등 이용 패턴</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">3. 개인정보의 보유 및 이용 기간</h2>
          <p>회원의 개인정보는 원칙적으로 회원 탈퇴 시까지 보유·이용됩니다.</p>
          <p>
            단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관 후 파기합니다.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">4. 개인정보의 파기 절차 및 방법</h2>
          <p>회원 탈퇴 시 개인정보는 즉시 삭제됩니다.</p>
          <ul className="list-disc pl-5">
            <li>전자적 파일 형태의 정보는 복구 불가능한 방법으로 삭제</li>
            <li>데이터베이스(DB)에서 즉시 삭제</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">5. 개인정보의 제3자 제공</h2>
          <p>“서비스”는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">6. 개인정보 처리 위탁</h2>
          <p>“서비스”는 원활한 운영을 위하여 다음과 같이 개인정보 처리를 위탁하고 있습니다.</p>
          <table className="text-14 w-full border-collapse border border-border-default text-left">
            <thead>
              <tr className="bg-surface-weak">
                <th className="border border-border-default p-3 font-bold">수탁업체</th>
                <th className="border border-border-default p-3 font-bold">위탁업무</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-default p-3">Amplitude</td>
                <td className="border border-border-default p-3">서비스 이용 통계 분석</td>
              </tr>
              <tr>
                <td className="border border-border-default p-3">AWS</td>
                <td className="border border-border-default p-3">서버 운영 및 데이터 보관</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">7. 이용자의 권리</h2>
          <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc pl-5">
            <li>개인정보 열람 요청</li>
            <li>정정 요청</li>
            <li>삭제 요청</li>
            <li>처리 정지 요청</li>
            <li>동의 철회</li>
          </ul>
          <p>권리 행사는 이메일을 통해 요청할 수 있으며, “서비스”는 지체 없이 조치합니다.</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">8. 쿠키 사용 및 거부에 관한 사항</h2>
          <p>“서비스”는 로그인 상태 유지 및 서비스 이용 분석을 위하여 쿠키를 사용합니다.</p>
          <p>
            쿠키는 이용자의 브라우저에 저장되는 소량의 정보로, 로그인 상태 유지 및 이용 행태 분석에
            활용됩니다.
          </p>
          <p>이용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.</p>
          <p>
            단, 쿠키 저장을 거부할 경우 로그인 유지가 되지 않거나 일부 기능 이용에 제한이 있을 수
            있습니다.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">9. 개인정보 보호책임자</h2>
          <ul className="list-disc pl-5">
            <li>책임자: 잉듀 운영진</li>
            <li>이메일: engdu.official@gmail.com</li>
          </ul>
        </section>
      </div>
    </PolicyLayout>
  );
}

export default PrivacyPolicy;

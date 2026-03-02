import PolicyLayout from './PolicyLayout';

function TermsOfService() {
  return (
    <PolicyLayout title="이용약관" effectiveDate="2024년 3월 2일">
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제1조 (목적)</h2>
          <p>
            본 약관은 잉듀(이하 “서비스”)가 제공하는 AI 기반 영어 학습 서비스의 이용과 관련하여
            서비스와 회원 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제2조 (정의)</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              “서비스”란 AI 기술을 활용하여 영어 지문, 문제 및 학습 콘텐츠를 생성·제공하는 웹
              플랫폼을 의미합니다.
            </li>
            <li>“회원”이란 본 약관에 동의하고 서비스에 가입하여 이용하는 자를 의미합니다.</li>
            <li>“AI 생성 콘텐츠”란 AI에 의해 생성된 지문, 문제, 해설 등을 의미합니다.</li>
            <li>“학습 기록”이란 회원의 학습 이력, 퀴즈 응답, 통계 정보 등을 의미합니다.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제3조 (약관의 게시 및 개정)</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              “서비스”는 본 약관의 내용을 “회원”이 확인할 수 있도록 서비스 초기 화면 및 접근 가능한
              화면에 링크 형태로 게시합니다.
            </li>
            <li>서비스는 관련 법령을 위반하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>
            <li>약관이 개정되는 경우 적용일자 및 개정 사유를 사전에 공지합니다.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제4조 (회원가입 및 계정 관리)</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>회원은 구글 계정을 이용하여 가입할 수 있습니다.</li>
            <li>회원은 자신의 계정 정보를 타인에게 양도하거나 공유할 수 없습니다.</li>
            <li>
              계정 관리의 책임은 회원 본인에게 있으며, 계정 관리 소홀로 발생한 손해에 대하여
              서비스는 책임을 지지 않습니다.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제5조 (서비스의 제공 및 변경)</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>서비스는 AI 기반 영어 학습 콘텐츠를 제공합니다.</li>
            <li>
              서비스는 운영상·기술상의 필요에 따라 서비스의 내용, 기능, 구성 등을 변경할 수
              있습니다.
            </li>
            <li>
              시스템 점검, 장애, 천재지변 등의 사유로 서비스 제공이 일시적으로 중단될 수 있습니다.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제6조 (회원의 의무)</h2>
          <p>회원은 다음 행위를 하여서는 안 됩니다.</p>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>타인의 계정을 도용하는 행위</li>
            <li>불법적이거나 타인의 권리를 침해하는 내용 입력</li>
            <li>저작권을 침해하는 자료의 업로드</li>
            <li>서비스의 정상적 운영을 방해하는 행위</li>
            <li>AI 시스템을 악용하거나 비정상적으로 이용하는 행위</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제7조 (서비스 이용 제한)</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              회원이 본 약관을 위반하는 경우 서비스는 사전 통지 없이 이용을 제한하거나 계정을 삭제할
              수 있습니다.
            </li>
            <li>
              위반 행위의 정도에 따라 경고, 일시 정지, 영구 정지 등의 조치를 취할 수 있습니다.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제8조 (AI 서비스 고지)</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              AI 생성 콘텐츠는 자동화된 시스템에 의해 생성되며, 그 정확성이나 완전성이 보장되지
              않습니다.
            </li>
            <li>
              본 서비스는 학습 보조 도구로 제공되며, 전문적인 법률·의학·재정 자문을 대체하지
              않습니다.
            </li>
            <li>AI 생성 콘텐츠의 이용 결과에 대한 책임은 회원 본인에게 있습니다.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제9조 (지적재산권)</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>서비스에 포함된 디자인, 로고, 구성 요소 등은 관련 법령에 따라 보호됩니다.</li>
            <li>회원이 입력한 데이터에 대한 권리는 해당 회원에게 귀속됩니다.</li>
            <li>
              AI 생성 콘텐츠에 대해서는 회원에게 개인적·비상업적 이용 범위 내에서 사용권이
              부여됩니다.
            </li>
            <li>회원은 서비스의 사전 동의 없이 이를 복제, 배포, 상업적으로 이용할 수 없습니다.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제10조 (면책)</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>
              서비스는 천재지변, 시스템 장애, 외부 공격 등 불가항력적 사유로 인한 서비스 중단에 대해
              책임을 지지 않습니다.
            </li>
            <li>AI 생성 결과의 오류 또는 부정확성으로 인한 손해에 대해 책임을 지지 않습니다.</li>
            <li>
              서비스는 무상으로 제공되며, 고의 또는 중대한 과실이 없는 한 회원에게 발생한 손해에
              대해 책임을 지지 않습니다.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-20 font-bold">제11조 (계약 해지 및 탈퇴)</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5">
            <li>회원은 언제든지 서비스 내 절차에 따라 탈퇴할 수 있습니다.</li>
            <li>회원이 약관을 위반한 경우 서비스는 이용 계약을 해지할 수 있습니다.</li>
          </ol>
        </section>
      </div>
    </PolicyLayout>
  );
}

export default TermsOfService;

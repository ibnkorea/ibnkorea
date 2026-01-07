// 폼 제출 플로우 테스트 스크립트
const WORKER_URL = 'https://ibn-analytics.urbane9293.workers.dev/submit';

async function testSubmit() {
  const testData = {
    airtableFields: {
      '접수일': new Date().toISOString().split('T')[0],
      '접수시간': new Date().toTimeString().split(' ')[0].slice(0,5),
      '기업명': '플로우테스트기업',
      '사업자번호': '999-99-99999',
      '대표자명': '테스트담당자',
      '연락처': '010-9999-8888',
      '이메일': 'flowtest@example.com',
      '업종': 'IT/소프트웨어',
      '직전년도매출': '1억 미만',
      '필요자금규모': '1억 ~ 3억',
      '자금종류': '창업자금, 운전자금',
      '문의사항': '플로우 테스트 문의입니다.'
    },
    emailFrom: 'IBN <noreply@mail.policy-fund.online>',
    customerEmail: 'flowtest@example.com',
    customerSubject: '[IBN] 무료진단 신청이 접수되었습니다',
    customerHtml: `
      <div style="font-family: 'Pretendard', -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #000000 0%, #141414 100%); color: white; padding: 35px 30px; border-radius: 16px 16px 0 0; text-align: center;">
          <img src="https://pub-5adc3ecd20c347cfb03e96cae9ceb623.r2.dev/logo_light.png" alt="IBN" style="width: 120px; height: auto; margin-bottom: 15px;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 700;">무료진단 신청이 접수되었습니다</h2>
          <p style="margin: 12px 0 0 0; opacity: 0.95; font-size: 14px; font-weight: 500;">IBN 정책자금 전문상담</p>
        </div>
        <div style="background: #fef3c7; padding: 12px 20px; text-align: center; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #92400e; font-size: 12px; line-height: 1.6;">📧 본 메일은 발신전용으로 회신이 불가합니다.<br>문의는 <strong>1522-7494</strong> 또는 <strong>hj.kim@urbane-gp.com</strong>으로 연락주세요.</p>
        </div>
        <div style="background: white; padding: 35px 30px; border: 1px solid #e5e7eb; border-top: none;">
          <div style="background: #F5F5F5; padding: 24px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #000000;">
            <p style="margin: 0 0 12px 0; font-size: 16px; color: #1A1A1A;">안녕하세요, <strong style="color: #000000;">테스트담당자</strong>님! 👋</p>
            <p style="margin: 0; color: #404040; line-height: 1.8; font-size: 14px;">정책자금 심사신청이 정상적으로 접수되었습니다.<br><br>영업일기준 24시간 이내 담당 전문 컨설턴트가 연락드리겠습니다.</p>
          </div>
          <div style="background: linear-gradient(135deg, #000000 0%, #141414 100%); padding: 24px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);">
            <h3 style="color: white; margin: 0 0 18px 0; font-size: 16px; font-weight: 600;">📋 접수 내용</h3>
            <table style="width: 100%; color: white; font-size: 12px; border-collapse: separate; border-spacing: 0 6px;">
              <tr><td style="padding: 8px 12px; background: rgba(255,255,255,0.15); border-radius: 8px 0 0 8px; width: 35%;">🏢 기업명</td><td style="padding: 8px 12px; background: rgba(255,255,255,0.1); border-radius: 0 8px 8px 0; font-weight: 600;">플로우테스트기업</td></tr>
              <tr><td style="padding: 8px 12px; background: rgba(255,255,255,0.15); border-radius: 8px 0 0 8px;">📞 연락처</td><td style="padding: 8px 12px; background: rgba(255,255,255,0.1); border-radius: 0 8px 8px 0; font-weight: 600;">010-9999-8888</td></tr>
              <tr><td style="padding: 8px 12px; background: rgba(255,255,255,0.15); border-radius: 8px 0 0 8px;">💰 희망자금</td><td style="padding: 8px 12px; background: rgba(255,255,255,0.1); border-radius: 0 8px 8px 0; font-weight: 600;">1억 ~ 3억</td></tr>
              <tr><td style="padding: 8px 12px; background: rgba(255,255,255,0.15); border-radius: 8px 0 0 8px;">⏰ 연락시간</td><td style="padding: 8px 12px; background: rgba(255,255,255,0.1); border-radius: 0 8px 8px 0; font-weight: 600;">오전 (09:00~12:00)</td></tr>
            </table>
          </div>
          <div style="text-align: center; padding: 20px 0; border-top: 1px dashed #e5e7eb;">
            <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 13px;">문의사항이 있으시면 아래 연락처로 연락주세요</p>
            <div style="display: inline-block; background: #f3f4f6; padding: 12px 24px; border-radius: 8px;">
              <span style="color: #374151; font-size: 14px;">📞 <strong>1522-7494</strong></span>
              <span style="color: #d1d5db; margin: 0 10px;">|</span>
              <span style="color: #374151; font-size: 14px;">✉️ <strong>hj.kim@urbane-gp.com</strong></span>
            </div>
          </div>
        </div>
        <div style="text-align: center; padding: 25px; background: #000000; border-radius: 0 0 16px 16px; color: white;">
          <p style="margin: 0 0 8px 0; font-weight: 700; font-size: 15px;">IBN</p>
          <p style="margin: 0 0 5px 0; opacity: 0.85; font-size: 13px;">중소기업 성장의 든든한 파트너</p>
          <p style="margin: 15px 0 0 0; opacity: 0.7; font-size: 11px;">※ 본 메일은 발신전용으로 회신이 불가합니다.</p>
          <p style="margin: 5px 0 0 0; opacity: 0.7; font-size: 11px;">문의: 1522-7494 | hj.kim@urbane-gp.com</p>
        </div>
      </div>
    `,
    staffEmails: ['hj.kim@urbane-gp.com', 'mkt@polarad.co.kr'],
    staffSubject: '[신규무료진단] 플로우테스트기업 - 무료진단 신청',
    staffHtml: `
      <div style="font-family: 'Pretendard', -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #000000 0%, #141414 100%); color: white; padding: 30px; border-radius: 16px 16px 0 0;">
          <h2 style="margin: 0; font-size: 24px; font-weight: 700;">🔔 IBN 신규 무료진단 신청</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 14px;">💻 홈페이지 접수 (테스트)</p>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
          <div style="background: #F5F5F5; padding: 20px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #000000;">
            <h3 style="color: #1A1A1A; margin: 0 0 15px 0; font-size: 18px;">📋 기업 정보</h3>
            <table style="width: 100%;">
              <tr><td style="padding: 8px 0; color: #525252; width: 40%;">🏢 기업명</td><td style="font-weight: 600; color: #1A1A1A;">플로우테스트기업</td></tr>
              <tr><td style="padding: 8px 0; color: #525252;">📄 사업자번호</td><td style="color: #374151;">999-99-99999</td></tr>
              <tr><td style="padding: 8px 0; color: #525252;">📍 지역</td><td style="color: #374151;">서울</td></tr>
              <tr><td style="padding: 8px 0; color: #525252;">🏭 업종</td><td style="color: #374151;">IT/소프트웨어</td></tr>
            </table>
          </div>
          <div style="background: #F5F5F5; padding: 20px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #000000;">
            <h3 style="color: #1A1A1A; margin: 0 0 15px 0; font-size: 18px;">👤 담당자 정보</h3>
            <table style="width: 100%;">
              <tr><td style="padding: 8px 0; color: #525252; width: 40%;">👤 이름</td><td style="color: #374151;">테스트담당자</td></tr>
              <tr><td style="padding: 8px 0; color: #525252;">📞 연락처</td><td style="color: #1A1A1A; font-weight: 600;">010-9999-8888</td></tr>
              <tr><td style="padding: 8px 0; color: #525252;">✉️ 이메일</td><td style="color: #374151;">flowtest@example.com</td></tr>
              <tr><td style="padding: 8px 0; color: #525252;">⏰ 연락시간</td><td style="color: #000000; font-weight: 600;">오전 (09:00~12:00)</td></tr>
            </table>
          </div>
          <div style="background: linear-gradient(135deg, #000000 0%, #141414 100%); padding: 20px; border-radius: 12px;">
            <h3 style="color: white; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">💰 자금 정보</h3>
            <table style="width: 100%; color: white;">
              <tr><td style="padding: 8px 0; opacity: 0.8; width: 40%;">희망자금</td><td style="font-weight: 600;">1억 ~ 3억</td></tr>
              <tr><td style="padding: 8px 0; opacity: 0.8;">자금종류</td><td>창업자금, 운전자금</td></tr>
              <tr><td style="padding: 8px 0; opacity: 0.8;">기타문의</td><td>플로우 테스트 문의입니다.</td></tr>
            </table>
          </div>
        </div>
        <div style="text-align: center; padding: 20px; background: #000000; border-radius: 0 0 16px 16px; color: white;">
          <p style="margin: 0; font-weight: 600; font-size: 14px;">IBN 내부용 알림</p>
        </div>
      </div>
    `
  };

  console.log('🚀 테스트 시작...');
  console.log('📤 요청 데이터:', JSON.stringify(testData, null, 2));

  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('\n📥 응답 결과:');
    console.log(JSON.stringify(result, null, 2));

    // 결과 분석
    console.log('\n📊 결과 분석:');
    console.log('  - Airtable:', result.airtable?.success ? '✅ 성공' : '❌ 실패', result.airtable?.error || '');
    console.log('  - 고객 이메일:', result.email?.customer?.success ? '✅ 성공' : '❌ 실패', result.email?.customer?.error || '');
    console.log('  - 담당자 이메일:', result.email?.staff?.success ? '✅ 성공' : '❌ 실패', result.email?.staff?.error || '');
    console.log('  - Telegram:', result.telegram?.success ? '✅ 성공' : '❌ 실패', result.telegram?.error || '');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

testSubmit();

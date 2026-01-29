/**
 * IBN 게시글 품질 검증 스크립트
 * PRD 기반 TDD 검증
 */

const fs = require('fs');
const path = require('path');

// ============================================
// PRD: 게시글 품질 요구사항
// ============================================
const PRD = {
    // 텍스트 요구사항
    minTextLength: 2000,           // 최소 2,000자
    minParagraphs: 8,              // 최소 8개 문단
    minSections: 4,                // 최소 4개 섹션 (h2/h3)

    // 시각화 요구사항
    minCharts: 2,                  // 최소 2개 차트
    minTables: 1,                  // 최소 1개 테이블
    minDataPoints: 10,             // 최소 10개 데이터 포인트 (숫자)

    // 구조 요구사항
    hasSummaryCard: true,          // 핵심 요약 카드 필수
    hasCTA: true,                  // CTA 섹션 필수
    hasHighlightBox: true,         // 하이라이트 박스 필수

    // 숫자/데이터 요구사항
    minNumbers: 15,                // 최소 15개 구체적 숫자
    hasPercentages: true,          // 퍼센트 수치 포함
    hasCurrency: true,             // 금액 수치 포함
};

// ============================================
// 검증 함수들
// ============================================

function extractText(html) {
    // HTML 태그 제거하고 텍스트만 추출
    return html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function countCharts(html) {
    const canvasMatches = html.match(/<canvas[^>]*>/g) || [];
    const chartJsMatches = html.match(/new Chart\(/g) || [];
    return Math.max(canvasMatches.length, chartJsMatches.length);
}

function countTables(html) {
    const tableMatches = html.match(/<table[^>]*>/g) || [];
    return tableMatches.length;
}

function countSections(html) {
    const h2Matches = html.match(/<h2[^>]*>/g) || [];
    const h3Matches = html.match(/<h3[^>]*>/g) || [];
    return h2Matches.length + h3Matches.length;
}

function countParagraphs(html) {
    const pMatches = html.match(/<p[^>]*class="content-text"[^>]*>/g) || [];
    return pMatches.length;
}

function countNumbers(text) {
    // 구체적인 숫자 패턴 (억, 조, %, 만 등 포함)
    const numberPatterns = [
        /\d+(?:,\d{3})*(?:\.\d+)?(?:조|억|만|천)?원?/g,  // 금액
        /\d+(?:\.\d+)?%/g,                              // 퍼센트
        /\d{4}년/g,                                      // 연도
        /\d+(?:,\d{3})*(?:개|명|건|회|일|주|개월)?/g,   // 수량
    ];

    let totalCount = 0;
    const foundNumbers = new Set();

    numberPatterns.forEach(pattern => {
        const matches = text.match(pattern) || [];
        matches.forEach(m => foundNumbers.add(m));
    });

    return foundNumbers.size;
}

function hasPercentages(text) {
    return /\d+(?:\.\d+)?%/.test(text);
}

function hasCurrency(text) {
    return /\d+(?:,\d{3})*(?:조|억|만)?원/.test(text);
}

function hasSummaryCard(html) {
    return html.includes('summary-card') || html.includes('핵심 요약');
}

function hasCTA(html) {
    return html.includes('cta-section') || html.includes('무료 상담');
}

function hasHighlightBox(html) {
    return html.includes('highlight-box') || html.includes('신규 지원');
}

// ============================================
// 메인 검증 로직
// ============================================

function validatePost(filePath) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const text = extractText(html);
    const fileName = path.basename(filePath);

    const results = {
        file: fileName,
        passed: true,
        checks: []
    };

    // 1. 텍스트 길이 검증
    const textLength = text.length;
    results.checks.push({
        name: '텍스트 길이',
        required: `>= ${PRD.minTextLength}자`,
        actual: `${textLength}자`,
        passed: textLength >= PRD.minTextLength
    });

    // 2. 문단 수 검증
    const paragraphCount = countParagraphs(html);
    results.checks.push({
        name: '문단 수',
        required: `>= ${PRD.minParagraphs}개`,
        actual: `${paragraphCount}개`,
        passed: paragraphCount >= PRD.minParagraphs
    });

    // 3. 섹션 수 검증
    const sectionCount = countSections(html);
    results.checks.push({
        name: '섹션 수 (h2/h3)',
        required: `>= ${PRD.minSections}개`,
        actual: `${sectionCount}개`,
        passed: sectionCount >= PRD.minSections
    });

    // 4. 차트 수 검증
    const chartCount = countCharts(html);
    results.checks.push({
        name: '차트 수',
        required: `>= ${PRD.minCharts}개`,
        actual: `${chartCount}개`,
        passed: chartCount >= PRD.minCharts
    });

    // 5. 테이블 수 검증
    const tableCount = countTables(html);
    results.checks.push({
        name: '테이블 수',
        required: `>= ${PRD.minTables}개`,
        actual: `${tableCount}개`,
        passed: tableCount >= PRD.minTables
    });

    // 6. 숫자 데이터 검증
    const numberCount = countNumbers(text);
    results.checks.push({
        name: '구체적 숫자',
        required: `>= ${PRD.minNumbers}개`,
        actual: `${numberCount}개`,
        passed: numberCount >= PRD.minNumbers
    });

    // 7. 퍼센트 수치 검증
    const hasPercent = hasPercentages(text);
    results.checks.push({
        name: '퍼센트 수치',
        required: '필수',
        actual: hasPercent ? '있음' : '없음',
        passed: hasPercent
    });

    // 8. 금액 수치 검증
    const hasMoney = hasCurrency(text);
    results.checks.push({
        name: '금액 수치',
        required: '필수',
        actual: hasMoney ? '있음' : '없음',
        passed: hasMoney
    });

    // 9. 요약 카드 검증
    const hasSummary = hasSummaryCard(html);
    results.checks.push({
        name: '핵심 요약 카드',
        required: '필수',
        actual: hasSummary ? '있음' : '없음',
        passed: hasSummary
    });

    // 10. CTA 섹션 검증
    const hasCtaSection = hasCTA(html);
    results.checks.push({
        name: 'CTA 섹션',
        required: '필수',
        actual: hasCtaSection ? '있음' : '없음',
        passed: hasCtaSection
    });

    // 11. 하이라이트 박스 검증
    const hasHighlight = hasHighlightBox(html);
    results.checks.push({
        name: '하이라이트 박스',
        required: '필수',
        actual: hasHighlight ? '있음' : '없음',
        passed: hasHighlight
    });

    // 전체 통과 여부
    results.passed = results.checks.every(c => c.passed);

    return results;
}

function printResults(results) {
    console.log('\n' + '='.repeat(60));
    console.log(`📄 ${results.file}`);
    console.log('='.repeat(60));

    results.checks.forEach(check => {
        const icon = check.passed ? '✅' : '❌';
        const status = check.passed ? 'PASS' : 'FAIL';
        console.log(`${icon} ${check.name.padEnd(20)} | ${check.required.padEnd(15)} | ${check.actual.padEnd(10)} | ${status}`);
    });

    console.log('-'.repeat(60));
    console.log(`결과: ${results.passed ? '✅ 모든 검증 통과' : '❌ 검증 실패'}`);
}

// ============================================
// 실행
// ============================================

const postsDir = path.join(__dirname, '..', 'posts');
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.html'));

console.log('\n🔍 IBN 게시글 품질 검증 시작\n');
console.log('PRD 요구사항:');
console.log(`  - 최소 텍스트: ${PRD.minTextLength}자`);
console.log(`  - 최소 차트: ${PRD.minCharts}개`);
console.log(`  - 최소 테이블: ${PRD.minTables}개`);
console.log(`  - 최소 숫자: ${PRD.minNumbers}개`);

let allPassed = true;
const allResults = [];

postFiles.forEach(file => {
    const filePath = path.join(postsDir, file);
    const results = validatePost(filePath);
    allResults.push(results);
    printResults(results);
    if (!results.passed) allPassed = false;
});

console.log('\n' + '='.repeat(60));
console.log('📊 전체 검증 결과');
console.log('='.repeat(60));

allResults.forEach(r => {
    const icon = r.passed ? '✅' : '❌';
    console.log(`${icon} ${r.file}`);
});

console.log('\n' + (allPassed ? '🎉 모든 게시글이 PRD 요구사항을 충족합니다!' : '⚠️  일부 게시글이 PRD 요구사항을 충족하지 않습니다.'));

process.exit(allPassed ? 0 : 1);

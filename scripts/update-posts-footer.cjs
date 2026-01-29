const fs = require('fs');
const path = require('path');

const postsDir = 'F:/pola_homepage/7.20th_kimhyunjoon_ibn/posts';

const posts = [
  '2026-startup-support.html',
  '2026-small-business-voucher.html',
  '2026-ax-sprint-track.html',
  '2026-non-capital-region.html',
  '2026-hope-return-package.html'
];

const footerHTML = `
    <!-- Footer Component -->
    <style>
        .ibn-footer {
            --footer-navy: #000000;
            --footer-navy-light: #141414;
            --footer-primary: #FFFFFF;
            --footer-accent: #E5E5E5;
            --footer-text: rgba(255, 255, 255, 0.88);
            --footer-sub-text: rgba(255, 255, 255, 0.6);
            --footer-border: rgba(255, 255, 255, 0.15);
        }
        .ibn-footer {
            background: #000000; border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #ffffff; padding: 60px 0 0; width: 100%;
        }
        .ibn-footer .footer-container { max-width: 1400px; margin: 0 auto; padding: 0 24px; }
        .ibn-footer .footer-top { padding-bottom: 32px; border-bottom: 1px solid var(--footer-border); }
        .ibn-footer .footer-logo { display: inline-flex; align-items: center; gap: 16px; margin-bottom: 12px; text-decoration: none; }
        .ibn-footer .footer-logo-image { height: 120px; width: auto; filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)); }
        .ibn-footer .footer-desc { margin: 0; color: var(--footer-text); font-size: 15px; line-height: 1.8; }
        .ibn-footer .footer-middle { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; padding: 40px 0; border-bottom: 1px solid var(--footer-border); }
        .ibn-footer .footer-title { font-size: 18px; font-weight: 600; margin-bottom: 20px; color: #ffffff; }
        .ibn-footer .contact-item { display: flex; align-items: center; gap: 12px; color: var(--footer-text); margin-bottom: 14px; font-size: 15px; }
        .ibn-footer .contact-item svg { width: 18px; height: 18px; flex-shrink: 0; stroke: var(--footer-primary); }
        .ibn-footer .footer-list { list-style: none; padding: 0; margin: 0; }
        .ibn-footer .footer-list li { margin-bottom: 12px; }
        .ibn-footer .footer-list a { color: var(--footer-sub-text); text-decoration: none; transition: all 0.3s ease; font-size: 15px; }
        .ibn-footer .footer-list a:hover { color: #ffffff; padding-left: 6px; }
        .ibn-footer .partnership-link { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--footer-border); }
        .ibn-footer .partnership-link a { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #ffffff; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 10px; padding: 12px 20px; font-size: 14px; font-weight: 600; transition: all 0.3s ease; }
        .ibn-footer .partnership-link a:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.6); transform: translateY(-2px); }
        .ibn-footer .partnership-icon { height: 24px; width: auto; filter: brightness(0) invert(1); }
        .ibn-footer .footer-bottom { padding: 28px 0; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .ibn-footer .copyright { color: var(--footer-sub-text); margin: 0; font-size: 13px; }
        .ibn-footer .footer-links { display: flex; align-items: center; gap: 12px; }
        .ibn-footer .footer-links a { color: var(--footer-sub-text); text-decoration: none; transition: color 0.3s ease; font-size: 13px; }
        .ibn-footer .footer-links a:hover { color: #ffffff; }
        .ibn-footer .footer-links .divider { color: var(--footer-border); }
        @media (max-width: 968px) { .ibn-footer .footer-middle { grid-template-columns: 1fr; gap: 40px; } .ibn-footer .footer-bottom { flex-direction: column; align-items: flex-start; } }
        @media (max-width: 768px) { .ibn-footer { padding: 44px 0 0; } .ibn-footer .footer-container { padding: 0 18px; } .ibn-footer .footer-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; } .ibn-footer .footer-list li { margin-bottom: 0; } }
    </style>

    <footer class="ibn-footer">
        <div class="footer-container">
            <div class="footer-top">
                <div class="footer-info">
                    <a href="../index.html" class="footer-logo">
                        <img src="https://pub-5adc3ecd20c347cfb03e96cae9ceb623.r2.dev/images/logo-light.png" alt="IBN" class="footer-logo-image">
                    </a>
                    <p class="footer-desc">
                        중소기업 성장의 든든한 파트너<br>
                        정책자금 승인의 모든 단계에 IBN가 함께합니다.
                    </p>
                </div>
            </div>
            <div class="footer-middle">
                <div class="footer-contact">
                    <h4 class="footer-title">Contact</h4>
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M16 12h-3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3v7z"></path></svg>
                        <span>대표자: 김현준</span>
                    </div>
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        <span>사업자등록번호: 231-11-03096</span>
                    </div>
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        <span>대표번호: 1522-7494</span>
                    </div>
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M12 12l8-5H4l8 5z"></path></svg>
                        <span>이메일: hj.kim@urbane-gp.com</span>
                    </div>
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>주소: 경기도 안산시 상록구 조구나리1길 56, 1층 103호</span>
                    </div>
                    <div class="partnership-link">
                        <a href="https://www.jjk-biz.com/" target="_blank" rel="noopener noreferrer">
                            <img src="https://pub-1872e954c9da49929650d78642a05e08.r2.dev/images/jjk-logo.png" alt="JJK" class="partnership-icon">
                            <span>JJK 업무협약 | IBN</span>
                        </a>
                    </div>
                </div>
                <div class="footer-menu">
                    <h4 class="footer-title">Menu</h4>
                    <ul class="footer-list">
                        <li><a href="../index.html">IBN</a></li>
                        <li><a href="../about.html">회사소개</a></li>
                        <li><a href="../process.html">진행절차</a></li>
                        <li><a href="../fund.html">정책자금</a></li>
                        <li><a href="../service.html">전문가서비스</a></li>
                        <li><a href="../marketing.html">온라인마케팅</a></li>
                        <li><a href="../index.html#contact-form">무료상담</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="copyright">Copyright 2026 IBN. All Rights Reserved.</p>
                <div class="footer-links">
                    <a href="../policy.html">이용약관</a>
                    <span class="divider">|</span>
                    <a href="../privacy.html">개인정보처리방침</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
    (function() {
        let lastScrollY = 0;
        let ticking = false;
        const header = document.querySelector(".header");
        const mobileNav = document.getElementById("mobileNav");
        function updateHeader() {
            const currentScrollY = window.scrollY;
            if (window.innerWidth <= 968) {
                if (currentScrollY > lastScrollY && currentScrollY > 50) {
                    header.classList.add("header-hidden");
                    if (mobileNav) mobileNav.classList.add("nav-hidden");
                } else if (currentScrollY < lastScrollY) {
                    header.classList.remove("header-hidden");
                    if (mobileNav) mobileNav.classList.remove("nav-hidden");
                }
            }
            lastScrollY = currentScrollY;
            ticking = false;
        }
        window.addEventListener("scroll", function() {
            if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
        }, { passive: true });
    })();
    </script>
</body>
</html>`;

posts.forEach(file => {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // </script></body></html> 패턴 찾기
  content = content.replace(/<\/script>\s*<\/body>\s*<\/html>\s*$/i, '</script>' + footerHTML);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Added footer:', file);
});

console.log('Phase 3 complete!');

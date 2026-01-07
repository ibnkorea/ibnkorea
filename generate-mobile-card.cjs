const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1080, height: 1920 });

    const htmlPath = path.resolve(__dirname, 'mobile-card.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    await page.screenshot({
        path: path.resolve(__dirname, 'images/mobile-card.png'),
        type: 'png'
    });

    console.log('✅ 모바일 명함 생성 완료: images/mobile-card.png');

    await browser.close();
})();

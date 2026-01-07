const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 630 });

    const htmlPath = path.resolve(__dirname, 'og-image.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    await page.screenshot({
        path: path.resolve(__dirname, 'images/og-image.png'),
        type: 'png'
    });

    console.log('✅ OG 이미지 생성 완료: images/og-image.png');

    await browser.close();
})();

const scraperObject = {
    url: 'http://tokopedia.com',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url, { waitUntil: "networkidle2" });
        await page.waitForSelector("input[data-unify=Search]");
        await page.type("input[data-unify=Search]", "HEADSET");
        await page.click('button[type=submit]');
        await sleep(500);
        await page.click('button[data-testid=btnSRPShopTab]');
        await sleep(5000);
        await page.waitForSelector('div#zeus-root.css-8atqhb');
        await sleep(500);
        await page.waitForSelector('div.css-jau1bt');
        await page.waitForSelector('div.css-1c82svt');
        await page.waitForSelector('div.css-rjanld');
        await page.waitForSelector('div.css-w8s582');

        let urls = await page.$$eval('div.css-dle711', links => {
            console.log("links ->", links);
            // links = links.map(el => el.querySelector('div[data-testid=shop-card] > a').href)
            return links;
        });
        console.log(urls);
        // process.exit()
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = scraperObject;
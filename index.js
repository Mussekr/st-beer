const cheerio = require('cheerio');
const fetch = require('node-fetch');
const express = require('express');

const port = process.env.PORT || 8080;
const app = express();
app.use(express.static('public'));

const venueMap = {
    blackdoor: 'https://untappd.com/v/black-door/4901471',
    sori: 'https://untappd.com/v/sori-taproom/5680470',
    kellasmallari: 'https://untappd.com/v/mallaskellari/8113787',
    rooster: 'https://untappd.com/v/cafe-rooster/2428548',
};

const fetchBeers = async (url, title) => {
    const resp = await fetch(url);
    const text = await resp.text();
    const $ = cheerio.load(text);
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="index.css" />
</head>
<body>
${$('div.menu-area').html()}
</body>
</html>`;
};
app.get('/', (req, res) => {
    const url = req.query.venue;
    if (venueMap[url]) {
        fetchBeers(venueMap[url], url).then((html) => res.send(html))
    } else {
        res.send('Haistakaa kaikki vittu');
    }
});
app.listen(port);

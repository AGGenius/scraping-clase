const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const url = 'https://aggenius.github.io/project-break-dashboard/html/';

app.get(('/'), (req, res) => {
    axios.get(url).then((response) => {
        if (response.status === 200) {
            const html = response.data;

            const $ = cheerio.load(html);
            const pageTitle = $('title').text();


            const links = [];
            const images = [];

            $('a').each((i, element) => {
                const link = $(element).attr('href');
                links.push(link);
            })

            $('img').each((i, element) => {
                const image = $(element).attr('src');
                images.push(image);
            })

            res.send(`
                <h1>${pageTitle}</h1>
                <h2>ENLACES</h2>
                <ul>
                    ${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
                </ul>
                <h2>IMAGENES</h2>
                <ul>
                    ${images.map(img => `<li>${img}</li>`).join('')}
                </ul>
            `);
        }
    });
});

app.listen(3000, () => {
    console.log('Express está ejecutandose en http://localhost:3000');
});


const axios = require('axios');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express()
const port = process.env.PORT || 3031

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function saveFile(url, res) {
    try {
        let filename = '/download.html';
        const response = await axios.get(url);
        fs.writeFile('public' + filename, response.data, (err) => {
            if (err) throw err;
            console.log(url, "saved");
            res.redirect(filename);
        });
    } catch (error) {
        console.error(error);
    }
}

app.post("/read-webpage", async function (req, res) {
    await saveFile(req.body.url, res)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
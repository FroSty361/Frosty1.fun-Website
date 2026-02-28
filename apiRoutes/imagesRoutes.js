const express = require("express");
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    const type = req.query.id;

    const directoryPath = path.join(__dirname, `../public/assets/images/${type}`);

    let links = "";

    try
    {
        const files = fs.readdirSync(directoryPath);
        
        const links = files.map(file => `/assets/images/${type}/${file}`).join(" ");
        
        res.send(links);
    }
    catch (err)
    {
        console.error(err);
        res.status(500).send(`Error Reading Directory ${directoryPath}`);
    }
});


module.exports = router;
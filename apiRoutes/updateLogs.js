const express = require("express");
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    const id = req.query.id;

    const filePath = path.join(__dirname, `../data/updateLogsData/${id}.txt`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err)
        {
            console.error(err);
            
            return res.status(500).send(`Error Reading Update Log File ${id}`);
        }

        res.send(data);
    });
});


module.exports = router;
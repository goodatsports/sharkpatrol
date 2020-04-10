const express = require('express');
const app = express();
const server = app.listen(3000, listening);

function listening() {
    console.log("listening...");
}

app.use(express.static('public'));
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use('/', express.static(path.resolve(__dirname, '../public')));

app.listen(8000, () => {
	console.log('Listening port 8000')
});
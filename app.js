'use strict';

let express = require('express');
let morgan = require('morgan');
let app = module.exports = express();

app.use(morgan('combined', {skip: _ => /test/i.test(process.env.NODE_ENV)}));
app.use(express.static('public'));

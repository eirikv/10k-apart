const express = require('express');
const compression = require('compression');
const minifyHTML = require('express-minify-html');
const Main = require('./pages/main');

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use(compression());
app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
}));

app.get('/', (req, res) => Main.render(req, res));

app.use('/public', express.static(__dirname + '/public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

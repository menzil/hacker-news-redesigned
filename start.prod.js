const express = require('express');
const bodyParser = require('body-parser');
const paths = require('./webpack/paths');
const compression = require('compression');
const fs = require('fs');
const manifest = {
  client: require('./build/assets/asset-manifest'),
};
const serverRender = require('./build/server/bundle.server.js').default;
const PORT_NUMBER = 8080;
const app = express();

// Enable compression when running in production mode locally,
// useful for testing performance and running tools like Lighthouse.
if (process.env.NODE_ENV === 'production' && process.env.LOCAL === 'true') {
  app.use(compression());
}

app.use(bodyParser.urlencoded({ extended: true }));

// Static assets
// Set max-age for all static assets to 1 month.
app.use(function(req, res, next) {
  const extensions = /\.(js|css|png|jpg|svg)$/;

  // Exclude /service-worker.js from cache so updates can be scheduled when the file changes.
  if (req.url !== '/service-worker.js' && extensions.test(req.url)) {
    res.header('Cache-Control', 'public, max-age=2592000')
  }
  next();
});
app.use(express.static(paths.buildPath));
app.use(express.static(paths.buildStaticPath));

// Pull contents of main.css and pass it as a string into a render function
// where it gets inlined to optimize the critical rendering path:
// https://developers.google.com/web/fundamentals/performance/critical-rendering-path/
//
// The CSS output is fairly small (4kb gzipped), so inlining all of it
// makes more sense instead of getting into Critical CSS conundrum.
// This is performed outside of the render function to avoid reading
// the file on each request.
const cssURL = manifest.client['main.css'];
// Strip out ASSET_URL from CSS path
const cssPath = './build' + /\/assets.*\.css$/.exec(cssURL)[0];
let css;

try {
  css = fs.readFileSync(cssPath, 'utf8');
} catch(e) {
  console.log('Encountered an error when reading the CSS file.');
  process.exit();
}
app.use(serverRender(manifest, css));

app.listen(PORT_NUMBER, () => {
  console.log(`Production server is running at port ${PORT_NUMBER}`);
});

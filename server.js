const express = require('express');
const app = express();
const PORT = 2200 || process.env.PORT;

const expressStaticGzip = require('express-static-gzip');
const compression = require('compression')
app.use(express.json());

app.use('/', compression());
app.use('/', expressStaticGzip('client/dist', {
  enableBrotli: true,
  customCompressions: [{
      encodingName: 'deflate',
      fileExtension: 'zz'
  }],
  orderPreference: ['br']
}));


app.listen(PORT, function() {
  console.log(`Server listening at http://localhost:${PORT}`);
});
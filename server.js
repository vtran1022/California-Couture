const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.use(express.static('client/dist'));

app.listen(PORT, function() {
  console.log(`Server listening at http://localhost:${PORT}`);
});
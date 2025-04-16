// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/images', express.static('uploads'));

app.listen(5000, () => {
  console.log('✅ Server chạy tại http://localhost:5000');
});

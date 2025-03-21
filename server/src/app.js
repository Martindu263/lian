const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/api/test', (req, res) => {
  res.json({ message: '服务器运行正常' });
});

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
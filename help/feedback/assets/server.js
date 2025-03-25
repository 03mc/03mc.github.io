const express = require('express');
app.use(express.json());
const fs = require('fs').promises;
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'feedback.json');

// 启用CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 初始化JSON文件
async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
}

// POST处理反馈提交
app.post('/submit-feedback', async (req, res) => {
  try {
    const { name, type, content } = req.body;
    const newFeedback = {
      id: Date.now(),
      name,
      type,
      content,
      timestamp: new Date().toISOString(),
      fixed: false
    };

    const data = JSON.parse(await fs.readFile(DATA_FILE));
    data.push(newFeedback);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// GET获取反馈列表
app.get('/get-feedback-list', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = JSON.parse(await fs.readFile(DATA_FILE));
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    res.json({
      feedbacks: data.slice(startIndex, endIndex),
      totalPages: Math.ceil(data.length / limit)
    });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// 启动服务器
async function startServer() {
  await initDataFile();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
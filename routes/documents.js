
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Document = require('../models/Document');
const { verifyToken, isAdmin } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.get('/documents', verifyToken, async (req, res) => {
  const docs = await Document.find();
  res.json(docs);
});

router.post('/upload', verifyToken, isAdmin, upload.single('file'), async (req, res) => {
  const { title, category } = req.body;
  const filepath = req.file.path;
  const doc = new Document({ title, category, filepath });
  await doc.save();
  res.json({ message: 'Uploaded' });
});

module.exports = router;
